
"use server"
import { satellite } from "@/config/api.config"
import { APIBaseResponse } from "@/interfaces/api.interface"
import {
    ICounter,
    ICreateCounterRequest,
    IUpdateCounterRequest,
} from "@/interfaces/services/counter.interface";
import { setToken } from "@/utils/cookie.util";
import { errorMessage } from "@/utils/error.util";
import { cookies } from "next/headers";
import { RedirectType } from "next/navigation";

const API_BASE_PATH = "/api/v1/counters";

export const apiGetAllCounters = async () => {
    try {
        const res = await satellite.get<APIBaseResponse<ICounter[]>>(
            `${API_BASE_PATH}/`,

        );
        return res.data;
    } catch (error) {
        return errorMessage<ICounter[]>(error);
    }
};

export const apiGetCounterById = async (id:number) => {
    try {
        const res = await satellite.get<APIBaseResponse<ICounter>> (
            `${API_BASE_PATH}/${id}`
        );
        return res.data;
    } catch (error) {
        return errorMessage<ICounter>(error);
    }
};

export const apiCreateCounter = async (data: ICreateCounterRequest) => {
    try {
        const res = await satellite.post<APIBaseResponse<ICounter>>(
            `${API_BASE_PATH}/create`,
            data
        );
        return res.data;
    } catch (error) {
        return errorMessage<ICounter>(error);
    }
};

export const apiUpdateCounter = async (data: IUpdateCounterRequest) => {
    try {
        const id = data.id;
        delete data.id;
        const res = await satellite.put<APIBaseResponse<ICounter>>(
            `${API_BASE_PATH}/${id}`,
            data
        );
        return res.data;
    } catch (error) {
        return errorMessage<ICounter>(error)
    }
};

export const apiDeleteCounter = async (id:number) => {
    try {
        const res = await satellite.delete<APIBaseResponse<{ success: boolean }>>(
            `${API_BASE_PATH}/${id}`
        );
        return res.data;
    } catch (error) {
        return errorMessage<{ success: boolean }>(error);
    }
};