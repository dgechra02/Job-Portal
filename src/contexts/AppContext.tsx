"use client";
import { setFnType, UserWithCompany } from "@/types/type";
import { useRouter } from "next/navigation";
import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AddJob } from "../../generated/prisma";

export const appContext = createContext<{
  user?: UserWithCompany | null;
  setUser?: (value: UserWithCompany | null) => void;
  userLoading?: boolean;
  setUserLoading?: setFnType;
}>({});

export default function AppContext({ children }: { children: ReactNode }) {

  // add company
  const [user, setUser] = useState<UserWithCompany | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(true);

  console.log("USER : ", user);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/currentUser`);
        // console.log("response of user : ", res);
        const data = await res.json();
        // console.log("data ; ", data);
        if (data.success) {
          setUser(data.data.user);
        }
        // console.log("current User message : ", data.message)
      } catch (error: any) {
        console.log("Error finding user : ", error.message);
      }
      setUserLoading(false);
    }
    getUser();
  }, []);

  return (
    <appContext.Provider
      value={{
        user,
        setUser,
        userLoading,
        setUserLoading,
      }}
    >
      {children}
    </appContext.Provider>
  );
}

export function useCustomHook() {
  return useContext(appContext);
}
