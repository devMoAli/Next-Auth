"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });
    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col gap-3 w-1/2"
      >
        <h1 className="text-black">Create New User</h1>
        <label className="text-black">Full Name</label>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          required={true}
          type="text"
          value={formData.name}
          className="m-2 bg-slate-400 rounded"
        />
        <label className="text-black">Email</label>
        <input
          id="email"
          name="email"
          onChange={handleChange}
          required={true}
          type="email"
          value={formData.email}
          className="m-2 bg-slate-400 rounded"
        />
        <label className="text-black">Password</label>
        <input
          id="password"
          name="password"
          onChange={handleChange}
          required={true}
          type="password"
          value={formData.password}
          className="m-2 bg-slate-400 rounded"
        />
        <input
          type="submit"
          value="Create User"
          className="bg-blue-300 hover:bg-blue-100"
        />
      </form>
      <p className="text-red-500">{errorMessage}</p>
    </>
  );
};

export default UserForm;
