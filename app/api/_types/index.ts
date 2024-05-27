export * from './Armory';
export * from './Character';
export * from './Gamecontent';

// eslint-disable-next-line no-unused-vars
export type BaseResponse<T extends (...args: any)=> any> = {
  data: Awaited<ReturnType<T>> | null;
  status: number;
  error: string | null;
};