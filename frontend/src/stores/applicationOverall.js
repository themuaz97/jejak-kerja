import { getApplyOverall } from "@/services/jobApplication.service";
import { defineStore } from "pinia";

export const useApplicationOverallStore = defineStore("applicationOverall", {
  state: () => ({
    applicationOverall: null, // User data
    loading: false, // Loading state
    error: null, // Error message
    fetched: false, // Indicates if the applicationOverall data has already been fetched
  }),
  actions: {
    async fetchApplicationStatus() {
      // If data is already fetched, return early
      if (this.fetched) {
        return this.applicationOverall;
      }

      this.loading = true;
      try {
        const { data } = await getApplyOverall();
        this.applicationOverall = data.resData.applyStatus || null; // Assign applicationOverall data
        this.fetched = true; // Mark as fetched
        this.error = null;
      } catch (error) {
        console.error(error);
        this.error = error.message || "Failed to fetch application Overall data";
      } finally {
        this.loading = false;
      }
    },
  },
});