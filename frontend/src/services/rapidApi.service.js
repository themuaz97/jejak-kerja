import { apiKeyService } from "@/utils/api.utils";
import { ENDPOINTS, rapidApiKey } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const searchJobs = async (params = {}) => {
  return await apiKeyService(ENDPOINTS.JOB_SEARCH, METHOD.GET, null, {}, params, rapidApiKey);
};