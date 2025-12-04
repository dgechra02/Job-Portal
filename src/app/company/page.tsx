// @ts-nocheck
"use client";
import React, { useContext, useEffect, useState } from "react";
import AddCompany from "@/components/profile/AddCompany";
import { useCustomHook } from "@/contexts/AppContext";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Spinner, Text } from "@radix-ui/themes";
import { User } from "../../../generated/prisma";
import { UserWithCompany } from "@/types/type";

export default function page() {
  const [isAddCompanyFormOpen, setIsAddCompanyFormOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useCustomHook();
  // console.log("usr in add company pa ge ", user);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/company");
      const data = await res.json();
      if (data.success) {
        setCompanies(data.data);
      }
      console.log(data.message);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col gap-5 items-center relative bg-black text-white">
      <header className="flex justify-between items-center px-4 py-2 border-b border-[#3a3a3a] w-full h-16">
        <Link href={"/"} className="flex gap-2 focus-visible:outline-none">
          <span className="bg-[#8292A7] flex items-center font-bold text-2xl py-1 px-2 leading-none rounded-md">
            H
          </span>
          <span className="md:block hidden text-3xl font-bold text-white ">
            HireScope
          </span>
        </Link>
        <div className="flex gap-3">
          {/* <h2 className="md:text-3xl sm:text-2xl text-xl font-semibold">
            Listed Companies
          </h2> */}
          <button
            onClick={() => {
              if (user) {
                setIsAddCompanyFormOpen(true);
              } else {
                alert("Login first!");
              }
            }}
            className="flex items-center justify-center border bg-white text-black font-bold px-3.5 py-2 rounded-lg cursor-pointer"
          >
            Add company
          </button>
        </div>
      </header>

      <div className="companies w-full flex flex-wrap p-5 gap-3">
        {!isLoading ? (
          companies.length != 0 ? (
            companies.map((com) => {
              console.log("company : ", com);
              return (
                <div
                  key={com.id}
                  className="flex flex-col gap-2 p-5 w-[460px] rounded-lg border bg-[#1c1c1c] border-[#2f2f2f] hover:border-[#686868] transition-all duration-300"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={
                        "https://i.pinimg.com/736x/ec/d9/c2/ecd9c2e8ed0dbbc96ac472a965e4afda.jpg"
                      }
                      alt="employer_logo"
                      className="w-5"
                    />
                    <span className="text-2xl font-semibold text-gray-200">
                      {com.companyName || "Company"}
                    </span>
                  </div>
                  <span className="text-gray-300">
                    Owner : {com?.owner?.fullName}
                  </span>
                  <span className="text-gray-300 line-clamp-5">
                    Description : {com.companyDescription}
                  </span>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_HOST_NAME}/company/${com.id}`}
                    className="text-gray-400 hover:text-gray-200 font-semibold w-fit flex gap-2 items-center transition-all duration-300"
                  >
                    view details
                    <MoveRight className="w-3 mt-1" />
                  </Link>
                </div>
              );
            })
          ) : (
            <span>No company listed</span>
          )
        ) : (
          <Spinner size={"3"} />
        )}
      </div>
      {/* <Text color="green">Test color</Text> */}
      {isAddCompanyFormOpen ? (
        <AddCompany setIsAddCompanyFormOpen={setIsAddCompanyFormOpen} />
      ) : null}
    </div>
  );
}

//  grid max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-5 gap-5
