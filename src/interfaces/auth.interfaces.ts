import { User } from "@prisma/client";

// login payload 
export type LoginPayload = {
  email: string;
  password:string;
}

// registration payload (User + Vendor fields)
export type RegistrationPayload = User & {
    farmName?: string;
    farmLocation?: string;
}