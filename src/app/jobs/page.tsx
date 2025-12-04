"use client";
import AddJobForm from "@/components/job/AddJobForm";
import { useCustomHook } from "@/contexts/AppContext";
import { Spinner } from "@radix-ui/themes";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Openings } from "../../../generated/prisma";
import { OpeningsWithCompany } from "@/types/type";

export default function page() {
  const { user } = useCustomHook();
  const [openings, setOpenings] = useState<OpeningsWithCompany[]>([]);
  const [isAddJobFormOpen, setIsAddJobFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/job");
        const data = await res.json();
        setOpenings(data?.data);
      } catch {
        console.log("error in finding jobs > openings");
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  console.log("openings : ", openings);

  return (
    <div className="bg-black text-white min-h-screen">
      <header className="flex justify-between py-3 px-6 border-b border-[#3a3a3a]">
        <Link href={"/"} className="flex gap-2 focus-visible:outline-none">
        <span className="bg-[#8292A7] flex items-center font-bold text-2xl py-1 px-2 leading-none rounded-md">
          H
        </span>
        <span className="md:block hidden text-3xl font-bold text-white ">
          HireScope
        </span>
      </Link>
        {/* <h3 className="text-2xl font-semibold">Jobs</h3> */}
        <button
          onClick={() => {
            if (!user) {
              alert("Login and create a company to add a job!");
            } else if (user && !user?.company) {
              alert("Create a company to add a job!");
            } else {
              setIsAddJobFormOpen(true);
            }
          }}
          className="flex items-center justify-center border bg-white text-black font-bold px-3 py-1.5 rounded-lg cursor-pointer"
        >
          Add Job
        </button>
      </header>

      <div className="main w-full p-5 flex gap-3 flex-wrap justify-center">
        {!isLoading ? (
          openings.length != 0 ? (
            openings?.map((job) => {
              return (
                <div
                  key={job?.id}
                  className="flex flex-col gap-2 p-5 w-[460px] rounded-lg border bg-[#1c1c1c] border-[#2f2f2f] hover:border-[#686868] transition-all duration-300"
                >
                  <Link
                    href={`jobs/${job.id}`}
                    className="text-2xl font-semibold text-gray-200 flex gap-2 w-fit"
                  >
                    {job?.title} <MoveRight className="mt-1" />
                  </Link>
                  <span className="text-gray-300">{job?.description}</span>
                  <span className=" text-gray-300 flex gap-1.5">
                    Posted By :
                    <Link
                      href={`/company/${job?.company_id}`}
                      className="w-fit flex gap-1.5 text-white"
                    >
                      {job?.company?.companyName}
                      <MoveRight width={15} className="" />
                    </Link>
                  </span>
                </div>
              );
            })
          ) : (
            <span>No job available</span>
          )
        ) : (
          <Spinner size={"3"} className=" text-white" />
        )}
      </div>
      {isAddJobFormOpen ? (
        <AddJobForm setIsAddJobFormOpen={setIsAddJobFormOpen} />
      ) : null}
    </div>
  );
}
