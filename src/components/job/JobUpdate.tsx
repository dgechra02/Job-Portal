"use client";
import { useCustomHook } from "@/contexts/AppContext";
import { Button } from "@radix-ui/themes";
import { X } from "lucide-react";
import React, { useState } from "react";
import { Openings } from "../../../generated/prisma";

export default function JobUpdate({
  job,
  setIsUpdateJobFormOpen,
}: {
  job: Openings;
  setIsUpdateJobFormOpen: (value: boolean) => void
}) {
  const [title, setTitle] = useState<string>(job?.title ?? "");
  const [description, setDescription] = useState(job?.description ?? "");
  const [location, setLocation] = useState(job?.location ?? "");
  const [salary, setSalary] = useState(job?.salary ?? 0);
  const [employmentType, setEmploymentType] = useState(
    job?.employmentType ?? ""
  );
  const [jobType, setJobType] = useState(job?.jobType ?? "");

  const { user }  = useCustomHook();

  async function handleJobUpdate(e: React.FormEvent) {
    e.preventDefault();
    const jobData = {
      title,
      description,
      location,
      salary: (salary),
      employmentType,
      jobType,
      company_id: user?.company?.id, // do this with backend for safety
    };

    // console.log("Job Added:", jobData);

    const res = await fetch(`/api/job/${job?.id}`, {
      method: "POST",
      body: JSON.stringify(jobData),
    });
    console.log("res of edit job : ", res);
    const data = await res.json();
    console.log("data of edit job : ", data);
    if (data?.success) {
      console.log("job saved successfully");
      setIsUpdateJobFormOpen(false)
      alert("Job edited")
    } else {
      alert("Something went wrong")
      console.log("Error while saving the job");
    }
  }

  return (
    <div className="h-screen w-screen bg-[#00000060] flex items-center justify-center p-4 absolute top-0 left-0 z-10">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md relative ">
        <button
          className="absolute top-3 right-3 w-fit cursor-pointer"
          onClick={() => setIsUpdateJobFormOpen(false)}
        >
          <X />
        </button>
        <h2 className="text-white text-xl font-medium mb-6 text-center">
          Edit Job
        </h2>

        <form className="flex flex-col gap-3" onSubmit={handleJobUpdate}>
          {/* Job Title */}
          <label>
            <span className="block text-white text-sm mb-2">Job Title</span>
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
            />
          </label>

          {/* Job Description */}
          <label>
            <span className="block text-white text-sm mb-2">
              Job Description
            </span>
            <textarea
              name="jobDescription"
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500 resize-none"
            />
          </label>

          {/* Job Location and Job Salary */}
          <div className="grid grid-cols-2 gap-4">
            <label>
              <span className="block text-white text-sm mb-2">
                Job Location
              </span>
              <input
                type="text"
                name="jobLocation"
                placeholder="Job Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
            </label>
            <label>
              <span className="block text-white text-sm mb-2">Job Salary</span>
              <input
                type="number"
                name="jobSalary"
                placeholder="Job Salary"
                value={salary}
                onChange={(e) => setSalary(parseInt(e.target.value))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
            </label>
          </div>

          {/* Employment Type */}
          <label>
            <span className="block text-white text-sm mb-2">
              Employment Type
            </span>
            <select
              name="employmentType"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-gray-500"
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </label>

          {/* Job Type */}
          <label>
            <span className="block text-white text-sm mb-2">Job Type</span>
            <select
              name="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-gray-500"
            >
              <option value="">Select Job Category</option>
              <option value="on-site">On site</option>
              <option value="remote">Remote</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Save Job
          </button>
        </form>
      </div>
    </div>
  );
}
