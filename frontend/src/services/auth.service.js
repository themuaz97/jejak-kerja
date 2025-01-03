import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const register = async (data) => {
    return await apiService(ENDPOINTS.REGISTER, METHOD.POST, data);
};

export const login = async (data) => {
    return await apiService(ENDPOINTS.LOGIN, METHOD.POST, data);
};

export const me = async () => {
    return await apiService(ENDPOINTS.ME, METHOD.GET);
};

export const refreshToken = async (data) => {
    return await apiService(ENDPOINTS.REFRESH_TOKEN, METHOD.POST, data);
};

export const logout = async () => {
    return await apiService(ENDPOINTS.LOGOUT, METHOD.POST);
};

export const forgotPassword = async (data) => {
    return await apiService(ENDPOINTS.FORGOT_PASSWORD, METHOD.POST, data);
};

export const resetPassword = async (data) => {
    return await apiService(ENDPOINTS.RESET_PASSWORD, METHOD.POST, data);
};

export const getGoogleLogin = async () => {
    return await apiService(ENDPOINTS.GOOGLE_LOGIN, METHOD.GET);
};