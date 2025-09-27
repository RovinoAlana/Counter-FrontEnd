import { ICounter } from "@/interfaces/services/counter.interface";
import { IQueue } from "@/interfaces/services/queue.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type InitialState = {
  selectedCounter: ICounter | null;
  currentQueue: IQueue | null;
  claimedQueue: {
    queueNumber: number;
    estimatedWaitTime: number;
    position: number;
    counterName: string;
    counterId: number;
  } | null;
};

type ICounterAppStore = InitialState & {
  setSelectedCounter: (counter: InitialState["selectedCounter"]) => void;
  setCurrentQueue: (queue: InitialState["currentQueue"]) => void;
  setClaimedQueue: (queue: InitialState["claimedQueue"]) => void;
  reset: () => void;
};

const initialState: InitialState = {
  claimedQueue: null,
  currentQueue: null,
  selectedCounter: null,
};

export const useCounterAppStore = create(
  persist<ICounterAppStore>(
    (set) => ({
      ...initialState,
      setClaimedQueue: (claimedQueue) => set({ claimedQueue }),
      setCurrentQueue: (currentQueue) => set({ currentQueue }),
      setSelectedCounter: (selectedCounter) => set({ selectedCounter }),
      reset: () => set(initialState),
    }),
    { name: "counter-app-store" }
  )
);
