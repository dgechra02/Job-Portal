import { MoveRight } from "lucide-react";
import Link from "next/link";
import React from "react";

import {AddJob, Company} from '../../../generated/prisma';
// to show company inside job

export default function JobCard({ job } : {job : AddJob}) {
  const { title, location} = job;
  
  const url = "job-search/" + job?.id;
  return (
    <div className="flex flex-col gap-2 rounded-2xl p-4 shadow-[0px_0px_5px_0px_rgba(255,255,255,0.4)] hover:shadow-[0px_0px_10px_3px_rgba(255,255,255,0.4)] bg-[#212121] border-l-4 border border-[#2f2f2f] hover:border-[#686868] transition-all duration-300">
      <span className="font-semibold truncate text-lg">{title}</span>
      <div className="flex gap-2 items-center">
        <img
          src={
            "https://i.pinimg.com/736x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
          }
          alt="employer_logo"
          className="w-5"
        />
        <span className="truncate text-gray-200 font-semibold">Google</span>
      </div>
      <span className="text-gray-400">Location: {location}</span>
      <Link
        href={url}
        className="text-gray-400 hover:text-gray-200 font-semibold flex gap-2 items-center transition-all duration-300"
      >
        view details
        <MoveRight className="w-3 mt-1" />
      </Link>
    </div>
  );
}
// add job - title, des, location - job salary, empl type, job type,
