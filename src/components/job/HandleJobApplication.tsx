"use client";
import React, { useState } from "react";
import DeleteApplyButton from "./DeleteApplyButton";
import JobApplyButton from "./JobApplyButton";
import { AddJob } from "../../../generated/prisma";

export default function HandleJobApplication({
  userHasApplied,
  job,
}: {
  userHasApplied: boolean;
  job: AddJob;
}) {
  const [userApplied, setUserApplied] = useState<boolean>(userHasApplied);
  return (
    <div>
      {userApplied ? (
        <DeleteApplyButton job={job} setUserApplied={setUserApplied} />
      ) : (
        <JobApplyButton job={job} />
      )}
    </div>
  );
}
