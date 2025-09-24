export interface APIBaseResponse<T = unknown> {
  status: boolean;
  message: string;
  data?: T;
  error?: IErrorResponse;
  pagination?: IPagination;
}

export interface IPagination {
  totalRecords: number;
  currentPage: number;
  totalPage: number;
  nextPage: number;
  prevPage: number;
  limit: number;
}

export interface IValidationError {
  field: string;
  message: string;
  type: string;
}

export interface IErrorResponse {
  message: string;
  status: number | undefined;
  data?: unknown;
}
