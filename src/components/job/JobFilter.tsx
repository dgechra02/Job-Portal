"use client";

import React, { FormEvent, useEffect, useState } from "react";
// import AddBulkDataToDB from "./AddBulkDataToDB";
import { useRouter } from "next/navigation";
import { useCustomHook } from "@/contexts/AppContext";
import { AlignJustify, Hamburger } from "lucide-react";
import { AddJob } from "../../../generated/prisma";
import { setFnType } from "@/types/type";

export default function JobFilter({
  handleJobFilterForm,
  setSalary,
  salary,
  jobType,
  setJobType,
  employmentType,
  setEmploymentType,
}: {
  handleJobFilterForm: (e: FormEvent) => void,
  salary : string,
  setSalary : (value : string) => void,
  jobType : string,
  setJobType : (value : string) => void,
  employmentType : string,
  setEmploymentType : (value : string) => void,
}) {
  // const {
  //   employmentType,
  //   setEmploymentType,
  //   jobType,
  //   setJobType,
  //   salary,
  //   setSalary,
  //   handleJobFilterForm,
  // } = useCustomHook();

  // const [jobDataArray, setJobDataArray] = useState<AddJob[] | null>([]);
  // const [employmentType, setEmploymentType] = useState<string>("Full-time");
  // const [jobType, setJobType] = useState<string>("Remote");
  // const [salary, setSalary] = useState<string>("1000");
  // const [currPage, setCurrPage] = useState<number>(1);

  const employmentTypes = [
    { id: "Internship", label: "Internship" },
    { id: "Part-time", label: "Part Time" },
    { id: "Full-time", label: "Full Time" },
    { id: "Contract", label: "Contract" },
  ];

  const jobTypes = [
    { id: "On-site", label: "On site" },
    { id: "Remote", label: "Remote" },
  ];

  // async function fetchJobFilterData() {
  //   try {
  //     const res = await fetch(
  //       `/api/jobSearch/?employmentType=${employmentType}&jobType=${jobType}&salary=${salary}&page=${currPage}`
  //     );
  //     // console.log("res ", res);
  //     const data = await res.json();
  //     console.log("data ", data);
  //     setJobDataArray(data.dataArray);
  //     // console.log("Data Array after filtering ", data.dataArray);
  //   } catch (error: any) {
  //     console.log("Error fetching data", error.message);
  //   }
  // }

  // useEffect(() => {
  //   fetchJobFilterData();
  // }, [currPage]);

  // const router = useRouter();
  // function handleJobFilterForm(e: FormEvent) {
  //   e.preventDefault();
  //   const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/jobSearch/?employmentType=${employmentType}&jobType=${jobType}&salary=${salary}&page=1`;
  //   router.push(url);
  //   fetchJobFilterData();
  // }

  return (
    <div className="md:block hidden p-4">
      <form
        onSubmit={handleJobFilterForm}
        className="w-80 bg-[#212121] text-white rounded-lg shadow-md p-6 flex flex-col gap-5 sticky top-[85px]"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold ">Filters</h2>
          <button
            type="reset"
            className="text-sm text-gray-400 cursor-pointer hover:underline "
          >
            Clear All
          </button>
        </div>
        <div className="text-gray-300">
          <h3 className="text-lg font-medium mb-4">Employment Type</h3>
          <div className="space-y-3 text-gray-400">
            {employmentTypes.map((type) => (
              <label
                key={type.id}
                className="flex items-center cursor-pointer w-fit"
              >
                <input
                  id={type.id}
                  type="checkbox"
                  checked={employmentType == type.id}
                  onChange={(e) => setEmploymentType(e?.target?.id)}
                  className="w-4 h-4 accent-gray-300"
                />
                <span className="ml-3">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="text-gray-300">
          <h3 className="text-lg font-medium mb-4">Job Type</h3>
          <div className="space-y-3 text-gray-400">
            {jobTypes.map((type) => (
              <label
                key={type.id}
                className="flex items-center cursor-pointer w-fit"
              >
                <input
                  id={type.id}
                  type="checkbox"
                  checked={jobType == type.id}
                  onChange={(e) => setJobType(e?.target?.id)}
                  className="w-4 h-4 accent-gray-300"
                />
                <span className="ml-3">{type.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="">
          <h3 className="text-lg font-medium mb-4">Salary in Lakhs</h3>
          <input
            type="number"
            className="h-10 w-full border rounded-md pl-2"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-white text-black font-medium py-3 px-4 rounded-md transition-colors cursor-pointer"
        >
          Apply Filters
        </button>
      </form>
      {/* <AddBulkDataToDB /> */}
    </div>
  );
}

// console.log(jobType);
//   const handleEmploymentTypeChange = (typeId) => {
//   setFormData(prev => ({
//     ...prev,
//     employmentType: prev.employmentType.includes(typeId)
//       ? prev.employmentType.filter(id => id !== typeId)
//       : [...prev.employmentType, typeId]
//   }));
// };

// const handleJobTypeChange = (typeId) => {
//   setFormData(prev => ({
//     ...prev,
//     jobType: prev.jobType.includes(typeId)
//       ? prev.jobType.filter(id => id !== typeId)
//       : [...prev.jobType, typeId]
//   }));
// };

// const router = useRouter();
// function handleJobFilterForm(e) {
//   e.preventDefault();
//   const url = `${process.env.NEXT_PUBLIC_HOST_NAME}/jobSearch/?employmentType=${employmentType}&jobType=${jobType}&salary=${salary}&page=1`;
//   router.push(url);
// }
