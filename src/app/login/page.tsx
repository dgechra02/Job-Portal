"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function page() {
  const [formError, setFormError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const uesrData = {
    email,
    password,
  };

  async function handleSumbit(e: FormEvent) {
    setFormError("");
    e.preventDefault();
    if (email.trim().length == 0) {
      setFormError("Email Can't be empty");
      return;
    } else if (password.trim().length == 0) {
      setFormError("Password Can't be empty");
      return;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(uesrData),
    });
    const data = await res.json();
    if (data?.success) {
      // console.log(data?.message);
      alert("Logged In Successfully!")
      window.location.href = "/";
    }
    if (!data.success) setFormError(data.message);
  }
  

  return (
    <div className="flex h-screen w-screen justify-center items-center bg-black text-white">
      
      <div className="auth bg-[#212121] rounded-xl  px-5 py-14 flex flex-col items-center gap-4 md:w-[450px] sm:w-[350px] w-[300px]">
        <div className="flex flex-col items-center gap-7">
          <div className="flex gap-2">
            <span className="bg-[#8292A7] font-bold text-2xl py-1 px-2 leading-none rounded-md">
              H
            </span>
            <span className="text-3xl font-bold text-white focus-within:outline-none focus-within:border-none">
              HireScope
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold">Welcome Back</span>
            <span className="text-gray-400">
              Sign in to your account to continue
            </span>
            <span className="text-gray-400 text-sm">
              (Guest? email: guest123@gmail.com, pass: 12345)
            </span>
          </div>
        </div>
        <form onSubmit={handleSumbit} className="flex flex-col gap-4 w-full">
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="bg-white h-11 cursor-pointer text-lg font-bold text-black rounded-md"
          >
            Login
          </button>

          <span className="text-gray-400 text-center">or</span>

          <Link
            href={"/sign-up"}
            className="h-11 cursor-pointer border-2 border-[#3a3a3a] hover:border-[#535353] hover:bg-[#3d3d3d] text-lg font-bold rounded-md transition-all duration-300 flex justify-center items-center"
          >
            Create New Account
          </Link>
        </form>
        <span className="text-red-500">{formError}</span>
      </div>
    </div>
  );
}
