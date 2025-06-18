/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Use relative API path since Nginx proxies /api to backend
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAPI = async (url: string) => {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error("GET request error:", error);
        throw error;
    }
};

export const postAPI = async (url: string, data: any) => {
    try {
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error) {
        console.error("POST request error:", error);
        throw error;
    }
};

export const putAPI = async (url: string, data: any) => {
    try {
        const response = await apiClient.put(url, data);
        return response.data;
    } catch (error) {
        console.error("PUT request error:", error);
        throw error;
    }
};

export const deleteAPI = async (url: string) => {
    try {
        const response = await apiClient.delete(url);
        return response.data;
    } catch (error) {
        console.error("DELETE request error:", error);
        throw error;
    }
};

export const uploadImage = async (url: string, file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("image", file);

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${url}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data.imageUrl;
    } catch (error) {
        console.error("Image upload error:", error);
        throw error;
    }
};