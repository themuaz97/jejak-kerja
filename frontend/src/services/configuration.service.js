import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const getRoles = async (params = {}) => {
  return await apiService(
    ENDPOINTS.ROLES,
    METHOD.GET,
    null,  // body
    {},    // headers
    params // query parameters
  );
};

export const addRole = async (data) => {
  return await apiService(ENDPOINTS.ROLE_ADD, METHOD.POST, data);
};

export const updateRole = async (id, data) => {
  return await apiService(ENDPOINTS.ROLE_UPDATE.replace(':id', id), METHOD.PUT, data);
};

export const deleteRole = async (id) => {
  return await apiService(ENDPOINTS.ROLE_DELETE.replace(':id', id), METHOD.PUT);
};

export const getUsers = async () => {
  return await apiService(ENDPOINTS.USERS, METHOD.GET);
};

export const getApplicationStatus = async () => {
  return await apiService(ENDPOINTS.APPLICATION_STATUS, METHOD.GET);
};

export const getApplicationOverall = async () => {
  return await apiService(ENDPOINTS.APPLICATION_OVERALL, METHOD.GET);
};