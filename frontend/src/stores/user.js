import { me } from "@/services/auth.service.js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // User data
    loading: false, // Loading state
    error: null, // Error message
    fetched: false, // Indicates if the user data has already been fetched
  }),
  actions: {
    async fetchMe() {
      // If data is already fetched, return early
      if (this.fetched) {
        return this.user;
      }

      this.loading = true;
      try {
        const { data } = await me();
        this.user = data.resData.user || null; // Assign user data
        this.fetched = true; // Mark as fetched
        this.error = null;
      } catch (error) {
        console.error(error);
        this.error = error.message || "Failed to fetch user data";
      } finally {
        this.loading = false;
      }
    },
  },
});
