// //@ts-nocheck
// "use client";
// import SavedJobCard from "@/components/job/SavedJobCard";
// import { useCustomHook } from "@/contexts/AppContext";
// import Link from "next/link";
// import React from "react";

// export default function page() {
//   const { savedJobs } = useCustomHook();

//   return (
//     <div className="flex flex-col gap-5 m-10 w-screen">
//       <span className="font-semibold text-2xl">Your saved jobs.</span>
//       <div className="jobList flex flex-col gap-5">
//         {savedJobs.length != 0 ? (
//           savedJobs.map((j) => <SavedJobCard key={j.job_id} job={j}/>)
//         ) : (
//           <div className="flex flex-col gap-2">
//             <span>No job saved yet!</span>
//             <Link href={"/jobSearch"} className="bg-green-200 px-4 py-2 w-fit">Search More Jobs</Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React from 'react'

export default function page() {
  return (
    <div>
      saved jobs page
    </div>
  )
}

