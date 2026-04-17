export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}
declare const generateTokens: (payload: TokenPayload) => {
    accessToken: string;
    refreshToken: string;
};
export default generateTokens;
