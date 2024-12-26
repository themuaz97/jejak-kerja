import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const getRoles = async (params = {}) => {
  return await apiService(
    ENDPOINTS.ADMIN_ROLES,
    METHOD.GET,
    null,  // body
    {},    // headers
    params // query parameters
  );
};

export const addRole = async (data) => {
  return await apiService(ENDPOINTS.ADMIN_ROLE_ADD, METHOD.POST, data);
};

export const updateRole = async (id, data) => {
  return await apiService(ENDPOINTS.ADMIN_ROLE_UPDATE.replace(':id', id), METHOD.PUT, data);
};

export const deleteRole = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_ROLE_DELETE.replace(':id', id), METHOD.PATCH);
};

export const getUsers = async (params = {}) => {
  return await apiService(ENDPOINTS.ADMIN_USERS, METHOD.GET, null, {}, params);
};

export const addUser = async (data) => {
  return await apiService(ENDPOINTS.ADMIN_USER_ADD, METHOD.POST, data);
};

export const updateUser = async (id, data) => {
  return await apiService(ENDPOINTS.ADMIN_USER_UPDATE.replace(':id', id), METHOD.PUT, data);
};

export const deleteUser = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_USER_DELETE.replace(':id', id), METHOD.PATCH);
};

export const activateUser = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_USER_ACTIVATE.replace(':id', id), METHOD.PATCH);
};

export const getApplicationStatus = async (params = {}) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_STATUS, METHOD.GET, null, {}, params);
};

export const addApplicationStatus = async (data) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_STATUS_ADD, METHOD.POST, data);
};

export const updateApplicationStatus = async (id, data) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_STATUS_UPDATE.replace(':id', id), METHOD.PUT, data);
};

export const deleteApplicationStatus = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_STATUS_DELETE.replace(':id', id), METHOD.PATCH);
}

export const activateApplicationStatus = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_STATUS_ACTIVATE.replace(':id', id), METHOD.PATCH);
}

export const getApplicationOverall = async (params = {}) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_OVERALL, METHOD.GET, null, {}, params);
};

export const addApplicationOverall = async (data) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_OVERALL_ADD, METHOD.POST, data);
};

export const updateApplicationOverall = async (id, data) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_OVERALL_UPDATE.replace(':id', id), METHOD.PUT, data);
};

export const deleteApplicationOverall = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_OVERALL_DELETE.replace(':id', id), METHOD.PATCH);
}

export const activateApplicationOverall = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_APPLICATION_OVERALL_ACTIVATE.replace(':id', id), METHOD.PATCH);
}