"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiCreateAdmin,
  apiDeleteAdmin,
  apiGetAdminById,
  apiGetAllAdmins,
  apiPostLogin,
  apiToggleAdminStatus,
  apiUpdateAdmin,
} from "./api.service";
import {
  ICreateAdminRequest,
  ILoginRequest,
  IToggleAdminStatusRequest,
  IUpdateAdminRequest,
} from "@/interfaces/services/auth.interface";
import toast from "react-hot-toast";

const AUTH_KEYS = {
  all: ["admins"] as const,
  byId: (id: number) => ["admins", id] as const,
};
export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["post login user"],
    mutationFn: (payload: ILoginRequest) => apiPostLogin(payload),
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error.message || "Login failed");
        return;
      }

      if (response && response.status === true) {
        toast.success("Login successful");
      } else {
        toast.error(response?.message || "Login failed");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Login failed");
    },
  });
};

export const useGetAllAdmins = () => {
  return useQuery({
    queryKey: [AUTH_KEYS.all],
    queryFn: () => apiGetAllAdmins(),
    refetchOnWindowFocus: false,
  });
};

export const useGetAdminById = (id: number) => {
  return useQuery({
    queryKey: [AUTH_KEYS.byId(id)],
    queryFn: () => apiGetAdminById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export const useCreateAdmin = () => {
  return useMutation({
    mutationFn: (data: ICreateAdminRequest) => apiCreateAdmin(data),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to create admin");
        return;
      }

      if (response && response.status === true) {
        toast.success("Admin created successfully");
      } else {
        toast.error(response?.message || "Failed to create admin");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create admin");
    },
  });
};

export const useUpdateAdmin = () => {
  return useMutation({
    mutationFn: (data: IUpdateAdminRequest) => apiUpdateAdmin(data),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to update admin");
        return;
      }

      if (response && response.status === true) {
        toast.success("Admin updated successfully");
      } else {
        toast.error(response?.message || "Failed to update admin");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update admin");
    },
  });
};

export const useDeleteAdmin = () => {
  return useMutation({
    mutationFn: (id: number) => apiDeleteAdmin(id),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to delete admin");
        return;
      }

      if (response && response.status === true) {
        toast.success("Admin deleted successfully");
      } else {
        toast.error(response?.message || "Failed to delete admin");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete admin");
    },
  });
};

// Toggle admin status
export const useToggleAdminStatus = () => {
  return useMutation({
    mutationFn: (data: IToggleAdminStatusRequest) => apiToggleAdminStatus(data),
    onSuccess: (response) => {
      if (response && response.error) {
        toast.error(response.error.message || "Failed to toggle admin status");
        return;
      }

      if (response && response.status === true) {
        const newStatus = response.data?.newStatus
          ? "activated"
          : "deactivated";
        toast.success(`Admin ${newStatus} successfully`);
      } else {
        toast.error(response?.message || "Failed to toggle admin status");
      }
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to toggle admin status");
    },
  });
};
