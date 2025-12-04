"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Close } from "@radix-ui/themes/components/dialog";
import { Cross, X } from "lucide-react";
import { FormEvent, useState } from "react";

export default function AddCompany({
  setIsAddCompanyFormOpen,
}: {
  setIsAddCompanyFormOpen: (value: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [formError, setFormError] = useState("");
  // const [logo, setLogo] = useState("");

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setFormError("")
    if (name.trim().length == 0) {
      setFormError("Company name can't be empty!");
      return;
    } else if (desc.trim().length == 0) {
      setFormError("Company description can't be empty!");
      return;
    }
    const company = {
      name,
      desc,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/company`, {
        method: "POST",
        body: JSON.stringify(company),
      });
      const data = await res.json();
      if (data?.success) {
        alert("Company added successfully");
        setIsAddCompanyFormOpen(false);
      } else {
        alert("Something went wrong, please try again later");
        console.log("error in creating company : ", data?.message); // runing when user trying to add 2nd company > handle it later
      }
    } catch (error: any) {
      alert("Error creating company, please try again later");
    }
  }
  return (
    <Card className="w-[90%] max-w-sm absolute top-50">
      <CardHeader className="flex flex-col">
        <CardTitle>Add New Company</CardTitle>
        <CardDescription>
          Enter your company title, and description.
        </CardDescription>
        <CardAction
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setIsAddCompanyFormOpen(false)}
        >
          <Button className="cursor-pointer">
            <X />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Company Description</Label>
              <Input
                id="description"
                type="text"
                required
                placeholder="description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleCreate}>
          sumbit
        </Button>
      </CardFooter>
      <span className="text-red-500 text-center">{formError}</span>
    </Card>
  );
}