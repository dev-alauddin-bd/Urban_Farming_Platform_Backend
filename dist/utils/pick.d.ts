declare const pick: <T extends Record<string, any>, k extends keyof T>(obj: T, keys: k[]) => Partial<T>;
export default pick;
