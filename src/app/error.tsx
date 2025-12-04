"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Error({ error } : {error : Error}) {
  return (
    <div className="flex justify-center items-center h-screen w-screen text-2xl font-semibold bg-black text-white">
      <div className="border-2 border-red-300 p-2 rounded-2xl">
        Something went wrong in App: <span className="text-red-300">{error.message || ""} </span>
      </div>
      <Button />
    </div>
  );
}

// npm install prisma --save-dev

// npx prisma

// npx prisma init --datasource-provider mongodb --output ../generated/prisma

// npx prisma generate > npx prisma db push

// npx create-next-app@latest ./ to install all dependencies in the same folder

// npx prisma studio // to view jobs

//   id          String @id @default(auto()) @map("_id") @db.ObjectId --  neccessary value of id

// {/* mXYh4unlqfDcQSAs */}
// mongodb+srv://dgrajendra2021:mXYh4unlqfDcQSAs@cluster0.zpn5jll.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 */}

