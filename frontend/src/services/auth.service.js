import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const login = async (data) => {
    return await apiService(ENDPOINTS.LOGIN, METHOD.POST, data);
};

export const register = async (data) => {
    return await apiService(ENDPOINTS.REGISTER, METHOD.POST, data);
};
