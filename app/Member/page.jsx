import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const Member = async () => {
  const session = await getServerSession(options);
  // if we don't have a session
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/Member");
  }
  return (
    <div>
      <h1>Server Member Session</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.role}</p>
    </div>
  );
};

export default Member;
