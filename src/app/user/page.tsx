"use client";

import { useCustomHook } from "@/contexts/AppContext";
import { User } from "lucide-react";

export default function UserProfile() {
  const { user } = useCustomHook();

  return (
    <div className="w-full min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>

        <div className="bg-[#212121] border border-[#3a3a3a] rounded-lg p-8 shadow-lg mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#3a3a3a] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-gray-300" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user?.fullName}</h2>
                <p className="text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#212121] border border-[#3a3a3a] rounded-lg p-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">User Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <span className="block text-sm font-semibold mb-2">
                Full Name
              </span>
              <div className="bg-[#3a3a3a] border border-[#4a4a4a] rounded-lg px-4 py-3">
                {user?.fullName}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold mb-2">User ID</span>
              <div className="bg-[#3a3a3a] border border-[#4a4a4a] rounded-lg px-4 py-3 text-gray-400">
                {user?.id}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold mb-2">
                Email Address
              </span>
              <div className="bg-[#3a3a3a] border border-[#4a4a4a] rounded-lg px-4 py-3">
                {user?.email}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold mb-2">Password</span>
              <div className="bg-[#3a3a3a] border border-[#4a4a4a] rounded-lg px-4 py-3 text-gray-400">
                ••••••••••••
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
