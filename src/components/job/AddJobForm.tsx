"use client";
import { useCustomHook } from "@/contexts/AppContext";
import { setFnType } from "@/types/type";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function AddJobForm({
  setIsAddJobFormOpen,
}: {
  setIsAddJobFormOpen: setFnType;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [jobType, setJobType] = useState("");

  const { user } = useCustomHook();
  const router = useRouter();

  async function handleJobAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Here you would typically send the job data to your backend or state management
    const jobData = {
      title,
      description,
      location,
      salary: parseFloat(salary),
      employmentType,
      jobType,
      // company_id: user.company.id, // do this with backend for safety
    };

    try {
      const res = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify(jobData),
      });
      const data = await res.json();
      if (data?.success) {
        alert("job added successfully");
        setIsAddJobFormOpen(false);
      } else {
        alert("Something went wrong");
      }
    } catch {
      alert("Error");
    }

    // Reset form fields after submission
    setTitle("");
    setDescription("");
    setLocation("");
    setSalary("");
    setEmploymentType("");
    setJobType("");
  }

  return (
    <div className="fixed top-0 left-0 h-screen w-screen flex items-center justify-center p-4 bg-black/60">
      <div className="bg-[#212121] rounded-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 cursor-pointer"
          onClick={() => setIsAddJobFormOpen(false)}
        >
          <X />
        </button>
        <h2 className="text-white text-xl font-medium mb-6 text-center">
          Add a new Job
        </h2>

        <form className="flex flex-col gap-3" onSubmit={(e) => handleJobAdd(e)}>
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
                onChange={(e) => setSalary(e.target.value)}
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
            className="w-full bg-white text-black font-medium py-2 px-4 rounded"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}