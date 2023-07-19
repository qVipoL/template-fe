export type MongoObjectId = string;
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
