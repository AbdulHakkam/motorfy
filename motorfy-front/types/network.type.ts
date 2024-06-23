export interface BaseResponse<T> {
  error: boolean;
  message: string;
  data: T;
}
