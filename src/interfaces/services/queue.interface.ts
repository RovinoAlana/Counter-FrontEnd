export type EQueueStatus =
  | "CLAIMED"
  | "CALLED"
  | "SERVED"
  | "SKIPPED"
  | "RELEASED"
  | "RESET";

export interface ICurrentQueuesResponse {
  id: number;
  isActive: boolean;
  name: string;
  currentQueue: number;
  status: EQueueStatus;
}

export interface IQueue {
  id: number;
  queueNumber: number;
  status: EQueueStatus;
  counter?: {
    id: number;
    name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface IClaimQueueResponse {
  queueNumber: number;
  counterName: string;
  counterId: number;
  estimatedWaitTime: number;
  positionInQueue: number;
}

export interface IGetQueueMetricsResponse {
  waiting: number;
  called: number;
  released: number;
  skipped: number;
}

export interface IReleaseQueueRequest {
  queue_number: number;
  counter_id: number;
}

export interface ICurrentQueuesResponse {
  id: number;
  isActive: boolean;
  name: string;
  currentQueue: number;
  status: EQueueStatus;
}

export interface INextQueueRequest {
  counter_id: number;
}

export interface INextQueueResponse {
  queue: IQueue;
  previousQueue?: IQueue | null;
}

export interface ISkipQueueRequest {
  counter_id: number;
}

export interface ISkipQueueResponse {
  skippedQueue: IQueue;
  nextQueue?: IQueue | null;
}

export interface IResetQueuesRequest {
  counter_id?: number;
}

export interface IResetQueuesResponse {
  affectedQueues: number;
}
