import { APIBaseResponse } from "@/interfaces/api.interface";
import { AxiosError } from "axios";

export const errorMessage = <TData = unknown>(
  error: unknown
): APIBaseResponse<TData> => {
  console.log("error in errormessage", error);
  if (error instanceof AxiosError) {
    console.log("error", error);
    if (error.response?.data?.error) {
      console.log("error.response.data.error", error.response.data.error);
      return {
        status: false,
        message: renderErr(error.response?.data?.error?.message),
        data: {} as TData,
        error: {
          message: renderErr(error.response?.data?.error?.message),
          status: error.response?.status,
          data: error.response?.data?.data,
        },
      };
    }

    console.log("error.response?.data?.message", error.response?.data?.message);

    return {
      status: false,
      message: renderErr(error.response?.data?.message),
      data: {} as TData,
      error: {
        message: renderErr(error.response?.data?.message),
        status: error.response?.status,
        data: error.response?.data?.data,
      },
    };
  }

  return {
    status: false,
    message: renderErr(error),
    data: {} as TData,
    error: {
      message: renderErr(error),
      status: 500,
    },
  };
};

export const renderErr = (msg: unknown) => {
  const defaultMsg = "Terjadi kesalahan, silahkan coba beberapa saat lagi!";

  if (typeof msg !== "string" || msg === "") return defaultMsg;
  if (msg.toLowerCase() === "something went wrong") return defaultMsg;

  return msg;
};
