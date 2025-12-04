"use client";
import JobsAndReviews from "@/components/company/JobsAndReviews";
import { CompanyWithOwner } from "@/types/type";
import { Spinner } from "@radix-ui/themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  // console.log("id id id id id ::: ", id);
  const [company, setCompany] = useState<CompanyWithOwner | null>();
  const [jobs, setJobs] = useState([]);

  console.log("id of company : ", id);

  useEffect(() => {
    async function fetchingData() {
      const res = await fetch("/api/company/" + id);
      // console.log("respnose while going to cmpany page : ", res);
      const data = await res.json();
      // console.log("data on the comany page : ", data);
      if (data.success) {
        setCompany(data?.data);
        setJobs(data?.data?.openings);
        // console.log("company found");
      } else {
        // alert("Company not found");
        console.log("company not found");
      }
    }
    fetchingData();
  }, []);

  console.log("company in the company/id: ", company);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-[#1c1c1c] border-b border-[#2f2f2f] flex justify-between items-center px-6 py-3 ">
        <Link href={"/"} className="flex gap-2 focus-visible:outline-none">
          <span className="bg-[#8292A7] flex items-center font-bold text-2xl py-1 px-2 leading-none rounded-md">
            H
          </span>
          <span className="md:block hidden text-3xl font-bold text-white ">
            HireScope
          </span>
        </Link>
        <h3 className="text-2xl font-bold">Company Details</h3>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-[#1c1c1c] rounded-lg p-6 border border-[#2f2f2f] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                Company Name
              </h3>
              <p className="text-lg font-medium text-white">
                {company?.companyName || (
                  <span className="animate-spin inline-block w-4 h-4 border-b-2 border-gray-400 rounded-full"></span>
                )}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                Description
              </h3>
              <p className="text-white">
                {company?.companyDescription || "No description available"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-2">
                Owner
              </h3>
              <p className="text-white">
                {company?.owner?.email || "No owner information"}
              </p>
            </div>
          </div>
        </div>

        <JobsAndReviews jobs={jobs} companyId={id} />
      </div>
    </div>
  );
}
