"use server";
import { satellite } from "@/config/api.config";
import { APIBaseResponse } from "@/interfaces/api.interface";
import {
  IAdmin,
  ICreateAdminRequest,
  ILoginRequest,
  ILoginResponse,
  IToggleAdminStatusRequest,
  IToggleAdminStatusResponse,
  IUpdateAdminRequest,
} from "@/interfaces/services/auth.interface";
import { setToken } from "@/utils/cookie.util";
import { errorMessage } from "@/utils/error.util";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

const API_BASE_PATH = "/api/v1/auth";

export const apiPostLogin = async (body: ILoginRequest) => {
  try {
    const cookie = await cookies();
    cookie.delete("token");

    const res = await satellite.post<APIBaseResponse<ILoginResponse>>(
      `${API_BASE_PATH}/login`,
      body
    );

    if (res.data.status === true && res.data.data?.token) {
      await setToken(res.data.data.token);
      delete res.data.data.token;
    }

    return res.data;
  } catch (error) {
    return errorMessage<ILoginResponse>(error);
  }
};

export const apiGetAllAdmins = async () => {
  try {
    const res = await satellite.get<APIBaseResponse<IAdmin[]>>(
      `${API_BASE_PATH}/`,
      
    );
    return res.data;
  } catch (error) {
    return errorMessage<IAdmin[]>(error);
  }
};

export const apiGetAdminById = async (id: number) => {
  try {
    const res = await satellite.get<APIBaseResponse<IAdmin>>(
      `${API_BASE_PATH}/${id}`
    );
    return res.data;
  } catch (error) {
    return errorMessage<IAdmin>(error);
  }
};

export const apiCreateAdmin = async (data: ICreateAdminRequest) => {
  try {
    const res = await satellite.post<APIBaseResponse<IAdmin>>(
      `${API_BASE_PATH}/create`,
      data
    );
    return res.data;
  } catch (error) {
    return errorMessage<IAdmin>(error);
  }
};

export const apiUpdateAdmin = async (data: IUpdateAdminRequest) => {
  try {
    const id = data.id;
    delete data.id;
    const res = await satellite.put<APIBaseResponse<IAdmin>>(
      `${API_BASE_PATH}/${id}`,
      data
    );
    return res.data;
  } catch (error) {
    return errorMessage<IAdmin>(error);
  }
};

export const apiDeleteAdmin = async (id: number) => {
  try {
    const res = await satellite.delete<APIBaseResponse<{ success: boolean }>>(
      `${API_BASE_PATH}/${id}`
    );
    return res.data;
  } catch (error) {
    return errorMessage<{ success: boolean }>(error);
  }
};

export const apiToggleAdminStatus = async (
  data: IToggleAdminStatusRequest
): Promise<APIBaseResponse<IToggleAdminStatusResponse>> => {
  try {
    const res = await satellite.patch<
      APIBaseResponse<IToggleAdminStatusResponse>
    >(`${API_BASE_PATH}/${data.id}/toggle-status`);
    return res.data;
  } catch (error) {
    return errorMessage<IToggleAdminStatusResponse>(error);
  }
};

export const tokenInterceptor = async (error: any): Promise<any> => {
  const cookie = await cookies();

  if (error?.response?.status === 401) {
    cookie.delete("token");
    redirect("/login", RedirectType.replace);
  }

  return Promise.resolve(errorMessage(error));
};
