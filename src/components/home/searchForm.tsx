//@ts-nocheck
"use client";
import { useCustomHook } from "@/contexts/AppContext";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function SearchForm() {
  const [searchedInput, setSearchedInput] = useState<string>("");
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    async function getSuggestion() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/jobSearch/suggestion?q=${searchedInput}`
      );
      const data = await res.json();
      if (data.success) setSuggestion(data.sugg);
    }

    let id = null;
    if (searchedInput) {
      id = setTimeout(() => {
        getSuggestion();
      }, 1000);
    } else {
      setSuggestion([]);
    }
    return () => clearTimeout(id);
    // useEffect dubara chalne se just pahle, pahle vale ka time clear ho jayega
  }, [searchedInput]);

  return (
    <div className="relative">
      <form
        action="/job-search"
        method="GET"
        className="border h-11 border-[#3a3a3a] p-1 rounded-lg flex items-center focus-within:outline-2 outline-[#545454] bg-[#1A1A1A] text-gray-400 overflow-hidden"
      >
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search Jobs..."
          autoComplete="on"
          className="p-1.5 outline-none w-40 md:w-60 lg:w-100 xl:w-150 text-lg"
          value={searchedInput}
          onChange={(e) => setSearchedInput(e.target.value)}
        />
        <button
          type="submit"
          className="py-1.5 px-2 cursor-pointer bg-[#3e3e3e] rounded-lg hover:text-white text-gray-400 transition-all duration-300 "
        >
          <Search />
        </button>
      </form>
      {/* <div className="suggestions absolute top-11 w-full bg-white border-2">
        {suggestion.map((ele) => {
          return <p key={ele.id}>{ele?.title}</p>;
        })}
      </div> */}
    </div>
  );
}
