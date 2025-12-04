"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function page() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  async function handleSumbit(e: FormEvent) {
    e.preventDefault();

    setFormError("");
    if (fullName.trim().length == 0) {
      setFormError("FullName can't be empty");
      return;
    } else if (email.trim().length == 0) {
      setFormError("Email can't be empty");
      return;
    } else if (password.trim().length == 0) {
      setFormError("Password can't be empty");
      return;
    } else if (confirmPassword.trim().length == 0) {
      setFormError("ConfirmPassword can't be empty");
      return;
    } else if (password != confirmPassword) {
      setFormError("Password and ConfirmPassword must be same");
      return;
    }

    const user = {
      fullName,
      email,
      password,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data?.success) {
        alert("Registered successfully");
        window.location.href = "/";
      } else {
        alert("something went wrong, please try again later");
      }
    } catch (error: any) {
      alert("Error occured, please try again later");
    }
  }

  return (
    <div className="flex min-h-screen w-screen justify-center items-center bg-black text-white p-5">
      <div className="auth bg-[#212121] rounded-xl  px-5 py-10 flex flex-col items-center gap-4 md:w-[450px] sm:w-[350px] w-[300px]">
        <div className="flex flex-col items-center gap-5">
          <div className="flex gap-2">
            <span className="bg-[#8292A7] font-bold text-2xl py-1 px-2 leading-none rounded-md">
              H
            </span>
            <span className="text-3xl font-bold text-white focus-within:outline-none focus-within:border-none">
              HireScope
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold">Create Account</span>
            <span className="text-gray-400">Join HireScope to get started</span>
          </div>
        </div>
        <form onSubmit={handleSumbit} className="flex flex-col gap-3 w-full">
          <label htmlFor="email" className="flex flex-col gap-1">
            Full Name
            <input
              id="full-name"
              type="text"
              name="full-name"
              className="border border-[#3a3a3a] hover:border-[#535353] px-3 rounded-md outline-none bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-all duration-300 h-11"
              placeholder="Enter Full Name"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
          </label>
          <label htmlFor="email" className="flex flex-col gap-1">
            Email Address
            <input
              id="email"
              type="email"
              name="email"
              className="border border-[#3a3a3a] hover:border-[#535353] px-3 rounded-md outline-none bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-all duration-300 h-11"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-1">
            Password
            <input
              id="password"
              type="password"
              name="password"
              className="border border-[#3a3a3a] hover:border-[#535353] px-3 rounded-md outline-none bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-all duration-300 h-11"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-1">
            Confirm Password
            <input
              id="cnf-password"
              type="password"
              name="cnf-password"
              className="border border-[#3a3a3a] hover:border-[#535353] px-3 rounded-md outline-none bg-[#2d2d2d] hover:bg-[#3d3d3d] transition-all duration-300 h-11"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="bg-white h-11 cursor-pointer text-lg font-bold text-black rounded-md"
          >
            Create Account
          </button>

          <span className="text-gray-400 text-center">or</span>

          <Link
            href={"/login"}
            className="h-11 cursor-pointer border-2 border-[#3a3a3a] hover:border-[#535353] hover:bg-[#3d3d3d] text-lg font-bold rounded-md transition-all duration-300 flex justify-center items-center"
          >
            Sign In to Existing Account
          </Link>
        </form>
        <span className="text-red-500">{formError}</span>
      </div>
    </div>
  );
}