import { apiService } from "@/utils/api.utils";
import { ENDPOINTS } from "@/constants/api.constant";
import { METHOD } from "@/constants/api-method.constant";

export const getFaqCategoriesAdmin = async (params = {}) => {
  return await apiService(
    ENDPOINTS.ADMIN_FAQ_CATEGORIES,
    METHOD.GET,
    null,  // body
    {},    // headers
    params // query parameters
  );
}

export const getFaqCategories = async () => {
  return await apiService(ENDPOINTS.FAQ_CATEGORIES, METHOD.GET);
}

export const addFaqCategory = async (data) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_CATEGORY_ADD, METHOD.POST, data);
}

export const updateFaqCategory = async (id, data) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_CATEGORY_UPDATE.replace(':id', id), METHOD.PUT, data);
}

export const deleteFaqCategory = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_CATEGORY_DELETE.replace(':id', id), METHOD.PATCH);
}

export const activateFaqCategory = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_CATEGORY_ACTIVATE.replace(':id', id), METHOD.PATCH);
}

export const getFaqQuestionsAdmin = async (params = {}) => {
  return await apiService(
    ENDPOINTS.ADMIN_FAQ_QUESTIONS,
    METHOD.GET,
    null,  // body
    {},    // headers
    params // query parameters
  );
}

export const getFaqQuestions = async () => {
  return await apiService(ENDPOINTS.FAQ_QUESTIONS, METHOD.GET);
}

export const addFaqQuestion = async (data) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_QUESTION_ADD, METHOD.POST, data);
}

export const updateFaqQuestion = async (id, data) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_QUESTION_UPDATE.replace(':id', id), METHOD.PUT, data);
}

export const deleteFaqQuestion = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_QUESTION_DELETE.replace(':id', id), METHOD.PATCH);
}

export const activateFaqQuestion = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_QUESTION_ACTIVATE.replace(':id', id), METHOD.PATCH);
}

export const getFaqAnswersAdmin = async (params = {}) => {
  return await apiService(
    ENDPOINTS.ADMIN_FAQ_ANSWERS,
    METHOD.GET,
    null,  // body
    {},    // headers
    params // query parameters
  );
}

export const getFaqAnswers = async () => {
  return await apiService(ENDPOINTS.FAQ_ANSWERS, METHOD.GET);
}

export const addFaqAnswer = async (data) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_ANSWER_ADD, METHOD.POST, data);
}

export const updateFaqAnswer = async (id, data) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_ANSWER_UPDATE.replace(':id', id), METHOD.PUT, data);
}

export const deleteFaqAnswer = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_ANSWER_DELETE.replace(':id', id), METHOD.PATCH);
}

export const activateFaqAnswer = async (id) => {
  return await apiService(ENDPOINTS.ADMIN_FAQ_ANSWER_ACTIVATE.replace(':id', id), METHOD.PATCH);
}