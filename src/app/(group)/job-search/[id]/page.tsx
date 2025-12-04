// @ts-nocheck
// "use client";
import HandleJobApplication from "@/components/job/HandleJobApplication";
import JobDeleteUpdate from "@/components/job/JobActions";
import ViewJobApplications from "@/components/job/ViewJobApplications";
import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { Button } from "@radix-ui/themes";
import { Bookmark } from "lucide-react";
import { notFound } from "next/navigation";

export default async function page({ params }) {
  const userData = await getUserFromCookies();
  const user = userData?.user;
  // const params = useParams();

  let id = params.id;
  // id = decodeURIComponent(id);
  // const [job, setJob] = useState({});

  console.log("id :: ", id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/jobSearch/${id}`);
  const data = await res.json();
  if (!data?.data) {
    notFound();
  }
  // setJob(data?.data);
  const job = data?.data;

  // console.log("job in the job details page : ", job);

  // console.log("id ::: ", id);
  // id = decodeURIComponent(id);
  // console.log("id ::: after decoding", id);
  // id = encodeURIComponent(id);
  // console.log("id ::: after encoding", id);
  // id = id.slice(0, -6);

  //   console.log("id : ", id);
  // const { jobDataArray, saveJobsFn, jobDetailsArray, setJobdetailsArray } =
  //   useCustomHook();

  //   console.log("job dat array ; ", jobDataArray);
  // const job = jobDataArray?.find((j) => j.job_id.slice(0, -2) === id); // no need to do this after decoding
  //   console.log("job : ", job);

  // const job = jobDataArray?.find((j) => j.job_id === id); // if I am using jobDataArray

  // useEffect(() => {
  //   async function fetchDetails() {
  //     const url =
  //       "https://jsearch.p.rapidapi.com/job-details?job_id=n20AgUu1KG0BGjzoAAAAAA%3D%3D&country=us";
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "x-rapidapi-key":
  //           "91fcd6a6d4mshd496a62b1d6b349p14bcfejsn1659c14bfedc",
  //         "x-rapidapi-host": "jsearch.p.rapidapi.com",
  //       },
  //     };
  //     try {
  //       const response = await fetch(url, options);
  //       const result = await response.json();
  //       // console.log("result : ", result);
  //       console.log("data : details :  ", result.data);
  //       // setJobdetailsArray(result.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   fetchDetails();
  // }, []);
  // can use job details api to get details of a job
  // but I am using jobDataArray to get the details of a job here, becuase I reached the monthly limit of the API

  // const job = jobDetailsArray?.find((j) => j.job_id === id);

  const { title, description, location, employmentType, jobType } = job ?? {};

  // console.log("job object : ", job);
  // console.log("current user object : ", user);

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
    <div className="w-full min-h-full bg-black text-white ">
      <div className="h-[80%] w-full flex flex-col gap-5 shadow-lg p-10 ">
        <span>
          <span className="font-semibold">Job Title: </span> {title}
        </span>
        <span>
          <span className="font-semibold ">Job Description: </span>{" "}
          <span className="line-clamp-6">{description}</span>
        </span>
        <span>
          <span className="font-semibold">Location: </span>
          {location}
        </span>
        <span>
          <span className="font-semibold">Job type: </span>
          {employmentType}
        </span>
        {/* <a href={apply_link} className="text-blue-600 underline">
        Apply here
      </a> */}

        <div className="jobActions flex flex-wrap gap-4">
          {/* <Button className="w-fit">
            <Bookmark width={20} /> Save
          </Button> */}
          <HandleJobApplication job={job} userHasApplied={userHasApplied} />
          {/* <ViewJobApplications job={job} /> */}
          {/* <JobDeleteUpdate user={user} job={job} /> */}
        </div>
      </div>
    </div>
  );
}
