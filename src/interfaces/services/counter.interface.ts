export interface ICounter {
  id: number;
  name: string;
  currentQueue: number;
  maxQueue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ICreateCounterRequest {
  name: string;
  max_queue: number;
  is_active: boolean;
}

export interface IUpdateCounterRequest extends ICreateCounterRequest {
  id?: number;
}

export interface ICounterResponse {
  id: number;
  name: string;
  currentQueue: number;
  maxQueue: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
