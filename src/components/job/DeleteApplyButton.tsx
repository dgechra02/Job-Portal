"use client";
import { Button } from "@radix-ui/themes";
import { Delete, SendIcon } from "lucide-react";
import React from "react";
import { AddJob } from "../../../generated/prisma";
import { setFnType } from "@/types/type";

export default function DeleteApplyButton({
  job,
  setUserApplied,
}: {
  job: AddJob;
  setUserApplied: setFnType
}) {
  async function handleDelete() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/job/apply/` + job?.id,
        {
          method: "DELETE",
        }
      );
    //   console.log("res of apply fetch ", res);
      const data = await res.json();
    //   console.log("data of apply ", data);
      if (data.success) {
        alert("Application withdrawed Successfully");
        setUserApplied(true)
      }
    } catch (err: any) {
      console.log("An error occured while withdrawing for job ", err?.message);
    }
  }

  return (
    <div>
      <Button onClick={handleDelete}>
        <Delete />
        Withdraw Application
      </Button>
    </div>
  );
}
