// //@ts-nocheck
// "use client";
// import { useCustomHook } from "@/contexts/AppContext";
// import React from "react";

// export default function SavedJobCard({ job }) {
//   //   console.log("job in saved page : ", job);
//   const { removeJobsFn } = useCustomHook();
//   const { job_title, employer_name, job_location } = job || [];
//   return (
//     <div className="flex flex-col gap-2 border-2 p-4 w-200 shadow">
//       <span>
//         <span className="font-semibold">Job Title: </span> {job_title}
//       </span>
//       <span>
//         <span className="font-semibold">Company: </span>
//         {employer_name}
//       </span>
//       <span>
//         <span className="font-semibold">Location: </span>
//         {job_location}
//       </span>
//       <button
//         className="bg-red-200 px-4 py-2 w-fit"
//         onClick={() => removeJobsFn(job)}
//       >
//         Remove
//       </button>
//     </div>
//   );
// }

import React from 'react'

export default function SavedJobCard() {
  return (
    <div>
      saved jobs
    </div>
  )
}

