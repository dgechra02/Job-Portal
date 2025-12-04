"use client";
import Header from "@/components/home/Header";
import JobFilter from "@/components/job/JobFilter";
import React, { Suspense, useEffect, useState } from "react";

export default function layout({ children } : {children : React.ReactNode}) {
  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      <Header />
      {children}
    </div>
  );
}
