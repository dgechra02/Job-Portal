"use client";
import { UserWithCompany } from "@/types/type";
import { Button } from "@radix-ui/themes";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Openings } from "../../../generated/prisma";
import JobUpdate from "./JobUpdate";
// import JobUpdate from "./JobUpdate";
export default function JobDeleteUpdate({
  user,
  job,
}: {
  user: UserWithCompany
  job: Openings;
}) {
  async function handleDelete() {
    try {
      const res = await fetch(`/api/job/${job?.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        console.log("Job deleted successfully");
        alert("job deleted");
        window.location.href = "/jobs";
      }
    } catch (error: any) {
      console.log("error in deleting job : ", error?.message);
    }
  }

  const [isUpdateJobFormOpen, setIsUpdateJobFormOpen] = useState(false);

  return (
    <div className="parent w-full">
      <div>
        {user && (user?.company?.id == job?.company_id) ? (
          <div className="w-full flex gap-4">
            <Button
              onClick={() => {
                const surelyDelete = confirm("Are you sure?");
                if (surelyDelete) handleDelete();
              }}
            >
              <Trash width={20} /> Delete Job
            </Button>
            <Button onClick={() => setIsUpdateJobFormOpen(true)}>
              <Pencil width={20} />
              Update Job
            </Button>
          </div>
        ) : null}
      </div>
      {isUpdateJobFormOpen ? (
        <JobUpdate job={job} setIsUpdateJobFormOpen={setIsUpdateJobFormOpen} />
      ) : null}
    </div>
  );
}