import { getFaqCategoriesAdmin } from "@/services/faq.service";
import { defineStore } from "pinia";

export const useFaqCategoryStore = defineStore("faqCategory", {
  state: () => ({
    faqCategory: null, 
    loading: false, // Loading state
    totalRecords: 0, // Total number of records
    totalPages: 0, // Total number of pages
    currentPage: 1, // Current page number
    error: null, // Error message
    fetched: false, // Indicates if the user data has already been fetched
  }),
  actions: {
    async fetchFaqCategories(forceRefresh = false) {
      // If data is already fetched and no refresh is forced, return early
      if (this.fetched && !forceRefresh) {
        return this.faqCategory;
      }

      this.loading = true;
      try {
        const { data } = await getFaqCategoriesAdmin({ page: this.currentPage });
        this.faqCategory = data.resData.data || null; // Assign user data
        this.totalRecords = data.resData.meta.totalCount;
        this.totalPages = data.resData.meta.totalPages;
        this.currentPage = data.resData.meta.page;
        this.error = null;
        this.fetched = true; // Mark as fetched
      } catch (error) {
        console.error(error);
        this.error = error.message || "Failed to fetch faq category data";
      } finally {
        this.loading = false;
      }
    },
  },
});

// TODO - Add more faqstores here
