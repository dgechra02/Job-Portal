import { getUserFromCookies } from "@/helper";
import Link from "next/link";
import React from "react";

export default async function CTA() {
  const data = await getUserFromCookies();
  const user = data?.user;
  return (
    <div className="flex w-[95%] bg-[#212121] rounded-2xl border border-[#3a3a3a] py-4 md:py-8 lg:py-12 xl:py-20 h-fit">
      <div className="content w-[90%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] flex flex-col items-center gap-3 lg:gap-7 m-auto">
        <h2 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white flex flex-col items-center gap-2 p-2 text-center">
          Ready to Advance Your Career?
        </h2>
        <p className="md:text-xl lg:text-2xl text-gray-400 flex flex-col items-center gap-1 text-center">
          <span>
            Join the platform that's helping professionals worldwide find
          </span>
          <span>better opportunities and companies build stronger teams.</span>
        </p>
        <div className="max-lg:flex-col flex gap-3 lg:gap-5 mt-2 lg:h-20 items-center">
          {!user ? (
            <Link
              href={"/sign-up"}
              className="text-black font-semibold text-sm lg:text-xl bg-white py-3 px-5 h-10 lg:h-15 cursor-pointer rounded-lg flex gap-2 items-center hover:-translate-y-1 transition-transform duration-500"
            >
              Create Your Profile
            </Link>
          ) : null}

          <Link
            href={"/job-search"}
            className="text-gray-400 hover:text-white font-semibold text-sm lg:text-xl hover:bg-[#212121] py-3 px-5 h-10 lg:h-15 cursor-pointer rounded-lg flex gap-2 items-center border border-[#3a3a3a] hover:-translate-y-1 transition-all duration-500"
          >
            Browse Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}
