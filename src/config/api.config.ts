"use server";
import { tokenInterceptor } from "@/services/auth/api.service";
import axios from "axios";
import { cookies } from "next/headers";
import { env } from "./env.config";

export const satellite = axios.create({
  baseURL: env.APP.API_URL,
  headers: {
    APIKey: env.APP.API_KEY,
  },
});

satellite.interceptors.request.use(
  async function (request) {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("token")?.value;

      if (token) {
        request.headers.Authorization = `Bearer ${token || ""}`;
      }
    } catch (error) {
      return Promise.reject(error);
    }

    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

satellite.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log("error in main", error.response);
    return tokenInterceptor(error);
  }
);
