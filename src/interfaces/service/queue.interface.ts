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