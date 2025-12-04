"use client";
import {
  Button,
  Card,
  Dialog,
  Flex,
  Spinner,
  Text
} from "@radix-ui/themes";
import { Eye } from "lucide-react";
import { useState } from "react";
import { AddJob, Application, User } from '../../../generated/prisma';

type ApplicationWithUser = Application & {user : User}

export default function ViewJobApplications({ job } : {job : AddJob}) {
  const [applicants, setApplicants] = useState<ApplicationWithUser[]>([]);
  const [loading, setLoading] = useState(false);

    async function getApplications() {
      setLoading(true);
      try {
        const res = await fetch("/api/applicants/" + job?.id);
        // console.log("res in get applicatins : ", res);
        const data = await res.json();
        console.log("data in get applicants : ", data);

        if (data.success) {
          console.log("applicants recieved");
          setApplicants(data?.data);
        } else {
          console.log("something went wrong " + data?.message);
        }
      } catch (error : any) {
        console.log("Error while finding applicants " + error?.message);
      }
      setLoading(false);
    }

    console.log("applicants : ", applicants);
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button onClick={getApplications} className="w-fit"><Eye width={20}/> View Applications</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Job Applications</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          list of job applicants
        </Dialog.Description>

        {/* <Flex direction="column" gap="3">
          <Text > 1. first one</Text>
        </Flex> */}

        <div>
          {applicants.length != 0 || loading ?  applicants.map((application) => {
            return (
              <Card key={application?.id}>
                <Text>{application?.user?.email}</Text>
              </Card>
            );
          }) : <span>no one applied</span>}
        </div>
        {loading ? <Spinner size={"3"} /> : null}

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}