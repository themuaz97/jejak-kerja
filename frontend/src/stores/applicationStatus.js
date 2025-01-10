import { getApplyStatus } from "@/services/jobApplication.service";
import { defineStore } from "pinia";

export const useApplicationStatusStore = defineStore("applicationStatus", {
  state: () => ({
    applicationStatus: null, // User data
    loading: false, // Loading state
    error: null, // Error message
    fetched: false, // Indicates if the applicationStatus data has already been fetched
  }),
  actions: {
    async fetchApplicationStatus() {
      // If data is already fetched, return early
      if (this.fetched) {
        return this.applicationStatus;
      }

      this.loading = true;
      try {
        const { data } = await getApplyStatus();
        this.applicationStatus = data.resData.applyStatus || null; // Assign applicationStatus data
        this.fetched = true; // Mark as fetched
        this.error = null;
      } catch (error) {
        console.error(error);
        this.error = error.message || "Failed to fetch application Status data";
      } finally {
        this.loading = false;
      }
    },
  },
});
