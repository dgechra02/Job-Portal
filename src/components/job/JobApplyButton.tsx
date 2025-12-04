"use client";
import { Button } from "@radix-ui/themes";
import { SendIcon } from "lucide-react";
import React, { useState } from "react";
import { AddJob } from "../../../generated/prisma";

export default function JobApplyButton({ job }: { job: AddJob }) {
  // console.log("job in jobapply button page : ", job);
  // const [userApplied, setUserApplied] = useState(false);

  async function handleSubmit() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/job/apply/` + job?.id);
      console.log("res of apply fetch ", res);
      const data = await res.json();
      console.log("data of apply ", data);
      if (data.success) {
        // console.log("")
        // setUserApplied(data?)
        alert("Applied Successfully");
      } else {
        alert("Login to apply");
      }
    } catch (err: any) {
      console.log("An error occured while applying for job ", err?.message);
    }
  }
  return (
    <div className="">
      <Button onClick={handleSubmit} >
        <SendIcon width={20}  />
        Apply
      </Button>
    </div>
  );
}
