// 'use client'
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { FormEvent, useState } from "react";

// export default function AddCompany() {
//   const [companyName, setCompanyName] = useState("");
//   const [companyDescription, setCompanyDescription] = useState("");
//   const [companyLogo, setCompanyLogo] = useState("");

//   async function handleCreate(e : FormEvent) {
//     e.preventDefault();
//     const company = {
//       companyName,
//       companyDescription,
//     };
    
//     const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company", {
//         method : "POST", 
//         body : JSON.stringify(company)
//     })
//     console.log("company adding status : ", res.message)
// }
//   return (
//     <Card className="w-full max-w-sm">
//       <CardHeader>
//         <CardTitle>Login to your account</CardTitle>
//         <CardDescription>
//           Enter your email below to login to your account
//         </CardDescription>
//         <CardAction>
//           <Button variant="link">Add</Button>
//         </CardAction>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="companyName">Company Name</Label>
//               <Input
//                 id="companyName"
//                 type="text"
//                 placeholder="name"
//                 required
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="description">Company Description</Label>
//               <Input id="description" type="text" required />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex-col gap-2">
//         <Button type="submit" className="w-full" onClick={handleCreate}>
//           sumbit
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>
      AddCompany
    </div>
  )
}
