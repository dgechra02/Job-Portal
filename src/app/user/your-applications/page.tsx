import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import React from "react";

export default async function page() {
  const data = await getUserFromCookies();
  if (!data?.user) {
    return <div>user not found</div>;
  }
  const user = data?.user;

  const applications = await prismaClient.application.findMany({
    where: {
      user_id: user.id,
    },
    include: {
      job: {
        include: {
          company: {
            include: {
              owner: true,
            },
          },
        },
      },
    },
  });

  if (!applications.length) {
    return <div>not job found</div>;
  }
  return (
    <div className="flex flex-col gap-5 p-3">
      <h3 className="text-2xl font-semibold">Your Applications</h3>
      <div className="applications p-5 flex gap-5 flex-wrap">
        {applications.map((application) => {
          return (
            <div key={application?.id} className="flex gap-1 border flex-col p-2">
              <span className="text-xl">
                job : {application?.job?.title}
              </span>
              <span className="text-xl">
                company : {application?.job?.company?.companyName}
              </span>
              <span className="text-xl">
                owner : {application?.job?.company?.owner?.email}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
