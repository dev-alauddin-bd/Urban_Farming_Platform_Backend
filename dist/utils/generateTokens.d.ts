import { UserRole } from "@prisma/client";
export interface TokenPayload {
    id: string;
    email: string;
    role: UserRole;
}
declare const generateTokens: (payload: TokenPayload) => {
    accessToken: string;
    refreshToken: string;
};
export default generateTokens;
