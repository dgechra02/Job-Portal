'use client'
import JobFilter from "@/components/job/JobFilter";
import JobListing from "@/components/job/JobListing";

import { FormEvent, useEffect, useState } from "react";
// import AddBulkDataToDB from "./AddBulkDataToDB";
import { useRouter } from "next/navigation";
import { AddJob } from "../../../../generated/prisma";

export default function page() {
  const [jobDataArray, setJobDataArray] = useState<AddJob[]>([]);
  const [employmentType, setEmploymentType] = useState<string>("Full-time");
  const [jobType, setJobType] = useState<string>("Remote");
  const [salary, setSalary] = useState<string>("1000");
  const [currPage, setCurrPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchJobFilterData() {
    try {
      const res = await fetch(
        `/api/jobSearch/?employmentType=${employmentType}&jobType=${jobType}&salary=${salary}&page=${currPage}`
      );
      // console.log("res ", res);
      const data = await res.json();
      console.log("data ", data);
      setJobDataArray(data.dataArray);
      // console.log("Data Array after filtering ", data.dataArray);
    } catch (error: any) {
      console.log("Error fetching data", error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchJobFilterData();
  }, [currPage]);

  const router = useRouter();
  function handleJobFilterForm(e: FormEvent) {
    e.preventDefault();
    const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/job-search/?employmentType=${employmentType}&jobType=${jobType}&salary=${salary}&page=1`;
    router.push(url);
    fetchJobFilterData();
  }

  return (
    <div className="mainContent w-full flex bg-black text-white">
      <JobFilter
        handleJobFilterForm={handleJobFilterForm}
        setSalary={setSalary}
        salary={salary}
        jobType={jobType}
        setJobType={setJobType}
        employmentType={employmentType}
        setEmploymentType={setEmploymentType}
      />
      <JobListing
        jobDataArray={jobDataArray}
        currPage={currPage}
        setCurrPage={setCurrPage}
        isLoading={isLoading}
      />
    </div>
  );
}
