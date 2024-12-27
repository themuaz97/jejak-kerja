import { me } from "@/services/auth.service.js";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // User data
    loading: true, // Loading state
    error: null, // Error message
  }),
  actions: {
    async fetchMe() {
      this.loading = true;
      try {
        const { data } = await me();
        console.log("response me", data);

        this.user = data.resData.user || null; // Assign user data
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
