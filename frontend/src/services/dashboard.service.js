import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const getDashboardCount = async () => {
  return await apiService(ENDPOINTS.DASHBOARD_COUNT, METHOD.GET);
};

export const getJobApplicationByStatus = async () => {
  return await apiService(ENDPOINTS.DASHBOARD_JOBS_BY_STATUS, METHOD.GET);
};

export const getJobApplicationByPlatform = async () => {
  return await apiService(ENDPOINTS.DASHBOARD_JOBS_BY_PLATFORM, METHOD.GET);
};