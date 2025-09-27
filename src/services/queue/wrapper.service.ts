"use client";
import {
  INextQueueRequest,
  IReleaseQueueRequest,
  IResetQueuesRequest,
  ISkipQueueRequest,
} from "@/interfaces/services/queue.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  apiClaimQueue,
  apiGetCurrentQueues,
  apiGetMetrics,
  apiNextQueue,
  apiReleaseQueue,
  apiResetQueues,
  apiSearchQueue,
  apiSkipQueue,
} from "./api.service";

const QUEUE_KEYS = {
  all: ["queues"] as const,
  current: ["queues", "current"] as const,
  metrics: ["queues", "metrics"] as const,
  search: (query: string) => ["queues", "search", query] as const,
};

export const useGetMetrics = () => {
  return useQuery({
    queryKey: QUEUE_KEYS.metrics,
    queryFn: () => apiGetMetrics(),
  });
};

export const useGetCurrentQueues = () => {
  return useQuery({
    queryKey: QUEUE_KEYS.current,
    queryFn: () => apiGetCurrentQueues(),
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });
};

export const useSearchQueue = (query: string) => {
  return useQuery({
    queryKey: QUEUE_KEYS.search(query),
    queryFn: () => apiSearchQueue(query),
    refetchInterval: 30000,
    refetchOnWindowFocus: false,
  });
};

export const useClaimQueue = () => {
  return useMutation({
    mutationFn: () => apiClaimQueue(),
    onSuccess: (response) => {
      const toastId = toast.loading("Memproses permintaan...", {
        duration: 5000,
      });
      if (response && response.error) {
        toast.error(response.error.message || "Failed to claim queue", {
          id: toastId,
        });
        return;
      }

      if (response && response.status === true) {
        toast.success("Nomor antrian berhasil diambil", { id: toastId });
      } else {
        toast.error(response?.message || "Failed to claim queue", {
          id: toastId,
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to claim queue");
    },
  });
};

export const useReleaseQueue = () => {
  return useMutation({
    mutationFn: (data: IReleaseQueueRequest) => apiReleaseQueue(data),
    onSuccess: (response) => {
      const toastId = toast.loading("Memproses permintaan...", {
        duration: 5000,
      });
      if (response && response.error) {
        toast.error(response.error.message || "Failed to release queue", {
          id: toastId,
        });
        return;
      }

      if (response && response.status === true) {
        toast.success("Nomor antrian berhasil dilepaskan", { id: toastId });
      } else {
        toast.error(response?.message || "Failed to release queue", {
          id: toastId,
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to release queue");
    },
  });
};

export const useNextQueue = () => {
  return useMutation({
    mutationFn: (data: INextQueueRequest) => apiNextQueue(data),
    onSuccess: (response) => {
      const toastId = toast.loading("Memproses permintaan...", {
        duration: 5000,
      });
      if (response && response.error) {
        toast.error(response.error.message || "Failed to process next queue", {
          id: toastId,
        });
        return;
      }

      if (response && response.status === true) {
        toast.success("Berhasil memproses antrian berikutnya", { id: toastId });
      } else {
        toast.error(response?.message || "Failed to process next queue", {
          id: toastId,
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to process next queue");
    },
  });
};

export const useSkipQueue = () => {
  return useMutation({
    mutationFn: (data: ISkipQueueRequest) => apiSkipQueue(data),
    onSuccess: (response) => {
      const toastId = toast.loading("Memproses permintaan...", {
        duration: 5000,
      });
      if (response && response.error) {
        toast.error(response.error.message || "Failed to skip queue", {
          id: toastId,
        });
        return;
      }

      if (response && response.status === true) {
        toast.success("Berhasil melewati antrian", { id: toastId });
      } else {
        toast.error(response?.message || "Failed to skip queue", {
          id: toastId,
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to skip queue");
    },
  });
};

export const useResetQueues = () => {
  return useMutation({
    mutationFn: (data: IResetQueuesRequest) => apiResetQueues(data),
    onSuccess: (response) => {
      const toastId = toast.loading("Memproses permintaan...", {
        duration: 5000,
      });
      if (response?.error) {
        toast.error(response.error.message || "Failed to reset queues", {
          id: toastId,
        });
        return;
      }

      if (response && response.status === true) {
        toast.success("Berhasil mereset antrian", { id: toastId });
      } else {
        toast.error(response?.message || "Failed to reset queues", {
          id: toastId,
        });
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to reset queues");
    },
  });
};
