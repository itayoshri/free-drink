export class ApiResponse<T = any> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
  }

  static success<T>(data?: T, message = 'Success'): ApiResponse<T> {
    return new ApiResponse<T>({ success: true, message, data });
  }

  static error(message = 'Error', error?: string): ApiResponse<null> {
    return new ApiResponse<null>({ success: false, message, error });
  }
}
