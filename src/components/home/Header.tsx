"use client";
import React, { useContext, useState } from "react";
import SearchForm from "./searchForm";
import Link from "next/link";
import { useCustomHook } from "@/contexts/AppContext";
import { Spinner } from "@radix-ui/themes";

// import { useCustomHook } from '@/contexts/AppContext'
// import { UserContext } from '@/app/(group)/layout'

export default function Header() {
  const { user, userLoading } = useCustomHook(); // login krne pe ye state update nhi ho rhi
  // if(!user.success){
  //   console.log("user status : ", user.mesasge);
  // }
  console.log("user : in header : ", user);

  return (
    <header className="sticky top-0 left-0 z-10 w-full flex gap-4 justify-between items-center px-3 py-3 md:px-6 border-b border-[#3a3a3a] bg-black">
      <Link href={"/"} className="flex gap-2 focus-visible:outline-none">
        <span className="bg-[#8292A7] flex items-center font-bold text-2xl py-1 px-2 leading-none rounded-md">
          H
        </span>
        <span className="md:block hidden text-3xl font-bold text-white ">
          HireScope
        </span>
      </Link>
      <div className="actions xl:flex hidden ">
        <Link
          href={"/job-search"}
          className=" text-lg px-3 py-1.5 rounded-lg hover:bg-[#212121] font-semibold text-gray-400 hover:text-white w-20 h-11 transition-all duration-300 text-center"
        >
          Jobs
        </Link>
        <Link
          href={"/company"}
          className="xl:block hidden text-lg px-3 py-1.5 rounded-lg hover:bg-[#212121] font-semibold text-gray-400 hover:text-white w-30 h-11 transition-all duration-300"
        >
          Companies
        </Link>
      </div>

      <SearchForm />

      { userLoading ? (
        <Spinner className="text-white" />
      ) : user ? (
        <Link
          href={"/user"}
          className="rounded-lg border text-xl border-[#3a3a3a] bg-[#212121] flex gap-2 justify-center items-center h-11 p-1"
        >
          <span className="bg-[#8292A7] rounded-full text-black text-sm flex justify-center items-center w-7 h-7 font-semibold">
            {user?.fullName?.slice(0,2).toUpperCase()}
          </span>
          {/* {user?.role ? user.role[0].toUpperCase() : "U"} */}
          <span className="md:block hidden text-gray-200 truncate max-w-30">
            {user?.fullName}
          </span>
        </Link>
      ) : (
        <Link
          href={"/login"}
          className="flex items-center justify-center border bg-white text-black font-bold px-3 py-1.5 rounded-lg cursor-pointer"
        >
          Login
        </Link>
      )}

      {/* <Link href={"/signup"} className='border bg-gray-200 px-3 py-1.5 rounded-lg'>signup</Link> */}
    </header>
  );
}