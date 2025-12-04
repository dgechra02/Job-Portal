import { User, Company, AddJob, Openings } from "../../generated/prisma";
export type JobWithCompany = Openings & { company: Company };
export type UserWithCompany = User & { company: Company | null} | null;
export type CompanyWithOwner = Company & { owner: User };
export type OpeningsWithCompany = Openings & { company : Company };
export type paramsType = { params: Promise<{ id: string }> };
export type setFnType = (value : boolean) => void;