import { Spinner } from "@radix-ui/themes";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="hero w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col gap-1 md:gap-5 xl:gap-10 items-center ">
      <h1 className=" text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-extrabold text-white flex flex-col items-center gap-2 p-2">
        <span>The Smarter Way </span> <span className="text-2xl md:text-4xl lg:text-5xl xl:text-7xl">to Find Your Next Role</span>
      </h1>
      
      <p className="md:text-xl lg:text-2xl text-gray-400 flex flex-col items-center gap-1 p-3 md:p-0">
        <span className="text-center">
          Connect with opportunities that matter. Our intelligent platform
          matches your
        </span>
        <span className="text-center">skills and ambitions with the right companies and roles.</span>
      </p>  
      <div className="flex max-sm:flex-col gap-3 sm:gap-5 mt-2 h-fit lg:h-20 items-center">
        <button className="text-black font-semibold text-sm lg:text-xl bg-white py-3 px-5 h-10 lg:h-15 cursor-pointer rounded-lg flex gap-2 items-center hover:-translate-y-1 transition-transform duration-500">
          <Link href={'/job-search'} > Explore Jobs</Link> <MoveRight className="w-4 mt-1" />
        </button>
        <button className="text-gray-400 hover:text-white font-semibold text-sm lg:text-xl hover:bg-[#212121] py-3 px-5 h-10 lg:h-15 cursor-pointer rounded-lg flex gap-2 items-center border border-[#3a3a3a] hover:-translate-y-1 transition-all duration-500">
          <Link href={'/company'} className=""> For Employers</Link> <MoveRight className="w-4 mt-1" />
        </button>
      </div>
    </div>
  );
}