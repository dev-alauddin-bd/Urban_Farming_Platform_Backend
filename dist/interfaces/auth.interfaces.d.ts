import { User } from "@prisma/client";
export type LoginPayload = {
    email: string;
    password: string;
};
export type RegistrationPayload = User & {
    farmName?: string;
    farmLocation?: string;
};
