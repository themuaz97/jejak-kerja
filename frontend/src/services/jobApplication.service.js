import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const getJobApplications = async (params = {}) => {
  return await apiService(
    ENDPOINTS.JOB_APPLICATIONS,
    METHOD.GET,
    null,  // body
    {},    // headers
    params // query parameters
  );
}

export const addJobApplication = async (data) => {
  return await apiService(ENDPOINTS.JOB_APPLICATION_ADD, METHOD.POST, data);
}

export const updateJobApplication = async (id, data) => {
  return await apiService(ENDPOINTS.JOB_APPLICATION_UPDATE.replace(':id', id), METHOD.PUT, data);
}

export const deleteJobApplication = async (id) => {
  return await apiService(ENDPOINTS.JOB_APPLICATION_DELETE.replace(':id', id), METHOD.PATCH);
}