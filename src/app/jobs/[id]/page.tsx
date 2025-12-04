import HandleJobApplication from "@/components/job/HandleJobApplication";
import JobDeleteUpdate from "@/components/job/JobActions";
import ViewJobApplications from "@/components/job/ViewJobApplications";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { paramsType } from "@/types/type";
import { Button } from "@radix-ui/themes";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function page({ params } : paramsType) {
  const userData = await getUserFromCookies();
  const user = userData?.user;

  let {id} = await params

  console.log("id :: ", id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/job/${id}`);
  const data = await res.json();
  if (!data?.data) {
    notFound();
  }
  // setJob(data?.data);
  const job = data?.data;

 const { title, description, location, employmentType, jobType } = job ?? {};

  // user has applied?
  let userHasApplied = false;
  if (user) {
    const currentUserApplications = await prismaClient?.application?.findMany({
      where: {
        job_id: id,
        user_id: user?.id,
      },
    });
    if (currentUserApplications.length > 0) userHasApplied = true;
  } // checking that user has applied or not

 return (
    <div className="w-full h-screen bg-black text-white">
      <header className="bg-[#1c1c1c] border-b border-[#2f2f2f] flex justify-between items-center px-6 py-3 mb-5 ">
        <Link href={"/"} className="flex gap-2 focus-visible:outline-none">
          <span className="bg-[#8292A7] flex items-center font-bold text-2xl py-1 px-2 leading-none rounded-md">
            H
          </span>
          <span className="md:block hidden text-3xl font-bold text-white ">
            HireScope
          </span>
        </Link>
        <h3 className="text-2xl font-bold">Job Details</h3>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#212121] border border-[#3a3a3a] rounded-lg p-8 shadow-lg">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-lg font-semibold">Job Title: </span>
              <span className="text-xl">{title}</span>
            </div>
            
            <div>
              <span className="font-semibold">Job Description:</span>
              <div className="mt-2 text-gray-300 line-clamp-6">
                {description}
              </div>
            </div>
            
            <div>
              <span className="font-semibold">Location: </span>
              <span className="text-gray-300">{location}</span>
            </div>
            
            <div>
              <span className="font-semibold">Job type: </span>
              <span className="text-gray-300">{employmentType}</span>
            </div>

            <div className="jobActions flex flex-wrap gap-4 pt-4 border-t border-[#3a3a3a]">
              {/* <Button className="w-fit bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
                <Bookmark width={16} height={16} />
                Save
              </Button> */}
              <HandleJobApplication job={job} userHasApplied={userHasApplied} />
              {user?.company?.id == job?.company_id ? <ViewJobApplications job={job} /> : null}
              <JobDeleteUpdate user={user} job={job} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
