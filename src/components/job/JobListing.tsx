"use client";
import JobCard from "@/components/job/JobCard";
import { Button } from "@/components/ui/button";
import { useCustomHook } from "@/contexts/AppContext";
import { AlignJustify } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SideBar from "./SideBar";
import { AddJob } from "../../../generated/prisma";
import { Spinner } from "@radix-ui/themes";

// type searchParams = Promise<{
//   q : string,
//   ms : string,
//   page : string
// }>

// const queries = await SearchParams
// const q = queries.q;
// const ms = queries.ms;
// const page = queries.page;

export default function JobListing({
  jobDataArray,
  currPage,
  setCurrPage,
  isLoading
}: {
  jobDataArray: AddJob[];
  currPage: number;
  setCurrPage: (value: number) => void;
  isLoading: Boolean
}) {
  const searchParams = useSearchParams();
  const searchedValue = searchParams.get("search") || "";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const {
  //   jobDataArray,
  //   currPage,
  //   setCurrPage,
  // } = useCustomHook();

  const showSearchedResults = jobDataArray?.filter((j) =>
    j.title.toLowerCase().includes(searchedValue?.toLowerCase())
  );

  return (
    <div className="p-4 relative flex-1 h-fit flex flex-col gap-3">
      {isSidebarOpen ? (
        <SideBar setIsSidebarOpen={setIsSidebarOpen} />
      ) : (
        <button
          className="bg-black p-2  md:hidden top-[85px] left-3 rounded border border-[#3a3a3a] shadow-[0px_0px_5px_0px_rgba(255,255,255,0.4)] w-fit"
          onClick={() => setIsSidebarOpen(true)}
        >
          <AlignJustify className="" />
        </button>
      )}
      <div className="jobCards grid gap-5 3xl:grid-cols-4 2xl:grid-cols-3 xl:grid-cols-2 grid-cols-1 mb-5 ">
        {!isLoading ? showSearchedResults?.length ? (
          showSearchedResults?.map((job) => {
            return <JobCard key={job?.id} job={job} />;
          })
        ) : (
          <span>No jobs found.</span>
        ) : <Spinner size={"3"} />}
      </div>
      <div className="pagination flex justify-between w-full">
        <Button
          onClick={() => setCurrPage(currPage - 1)}
          className={`${
            currPage == 1 ? "opacity-20 pointer-events-none" : "cursor-pointer"
          } bg-white/90 text-black hover:bg-white transition-all duration-300`}
        >
          Prev
        </Button>
        <Button
          onClick={() => setCurrPage(currPage + 1)}
          className={`${
            jobDataArray?.length < 10
              ? "opacity-20 pointer-events-none"
              : "cursor-pointer"
          } bg-white/90 text-black hover:bg-white transition-all duration-300`}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
