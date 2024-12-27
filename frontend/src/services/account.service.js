import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const updateMe = async (formData) => {
  return await apiService(
    ENDPOINTS.ACCOUNT_PERSONAL_UPDATE,
    METHOD.PUT,
    formData,
    { 'Content-Type': 'multipart/form-data' }
  );
};

export const updatePassword = async (data) => {
  return await apiService(ENDPOINTS.ACCOUNT_PASSWORD_UPDATE, METHOD.PUT, data);
};