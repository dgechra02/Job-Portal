"use client";
import { Box, Spinner, Tabs, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ReviewForm from "./ReviewForm";
import { AddJob, Review } from "../../../generated/prisma";

export default function JobsAndReviews({
  jobs,
  companyId,
}: {
  jobs: AddJob[];
  companyId: string;
}) {
  console.log("companyId in jobandreviews component ", companyId);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log("reviews : ", reviews);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/company/review/" + companyId);
      const data = await res.json();
      if (data.success) {
        setReviews(data?.data);
      } else {
        console.log("something went wrong");
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Jobs Section */}
      <div className="bg-[#1c1c1c] rounded-lg p-6 border border-[#2f2f2f]">
        <h3 className="text-lg font-medium text-white mb-4">
          Jobs by this company
        </h3>
        <div className="space-y-3">
          {!isLoading ? (
            jobs?.length ? (
              jobs.map((job, index) => (
                <div
                  key={job.id}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-gray-600 text-white text-sm font-medium rounded-full">
                    {index + 1}
                  </span>
                  <span className="text-white">{job.title}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No jobs available</p>
            )
          ) : (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-[#1c1c1c] rounded-lg p-6 border border-[#2f2f2f]">
        <h3 className="text-lg font-medium text-white mb-4">Reviews</h3>

        <ReviewForm
          companyId={companyId}
          setReviews={setReviews}
          reviews={reviews}
        />
        <div className="space-y-3">
          {!isLoading ? (
            reviews?.length ? (
              reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="flex items-center justify-center w-6 h-6 bg-gray-600 text-white text-sm font-medium rounded-full mt-0.5">
                    {index + 1}
                  </span>
                  <div className="review flex flex-col">
                    <span className="text-sm text-gray-500">{review?.userName}</span>
                    <span className="text-white">{review.content} </span>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews</p>
            )
          ) : (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-400"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}