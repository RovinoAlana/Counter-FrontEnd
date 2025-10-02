"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    apiCreateCounter,
    apiDeleteCounter,
    apiGetCounterById,
    apiGetAllCounters,
    apiUpdateCounter
} from "./api.service";
import {
    ICreateCounterRequest,
    IUpdateCounterRequest
} from "@/interfaces/services/counter.interface";
import toast from "react-hot-toast";

const AUTH_KEYS = {
  all: ["counters"] as const,
  byId: (id: number) => ["counters", id] as const,
};

export const useGetAllCounters = () => {
    return useQuery({
        queryKey: [AUTH_KEYS.all],
        queryFn: () => apiGetAllCounters(),
        refetchOnWindowFocus: false,
    })
}

export const useGetCounterById = (id: number) => {
  return useQuery({
    queryKey: [AUTH_KEYS.byId(id)],
    queryFn: () => apiGetCounterById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useCreateCounter = () => {
  return useMutation({
    mutationFn: (data: ICreateCounterRequest) => apiCreateCounter(data),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to create counter");
        return;
      }

      if (response && response.status === true) {
        toast.success("Counter created successfully");
      } else {
        toast.error(response?.message || "Failed to create counter");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create counter");
    },
  });
};

export const useUpdateCounter = () => {
  return useMutation({
    mutationFn: (data: IUpdateCounterRequest) => apiUpdateCounter(data),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to update counter");
        return;
      }

      if (response && response.status === true) {
        toast.success("Counter updated successfully");
      } else {
        toast.error(response?.message || "Failed to update counter");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update counter");
    },
  });
};

export const useDeleteCounter = () => {
  return useMutation({
    mutationFn: (id: number) => apiDeleteCounter(id),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to delete counter");
        return;
      }

      if (response && response.status === true) {
        toast.success("Admin deleted successfully");
      } else {
        toast.error(response?.message || "Failed to delete counter");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete counter");
    },
  });
};