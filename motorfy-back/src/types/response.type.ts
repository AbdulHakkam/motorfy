export type IResponse<T> = {
  error?: boolean;
  message?: string;
  data?: T;
};
