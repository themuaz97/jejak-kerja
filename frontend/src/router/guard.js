import { me } from "@/services/auth.service";

export const protectRoute = (router) => {
    router.beforeEach(async (to, from, next) => {
        try {
            // Check session validity by calling a protected endpoint
            await me();
            next(); // Session is valid, proceed
        } catch (error) {
            console.error("Session validation failed:", error.message);
            if (to.name !== "landing") {
                next({ name: "landing" }); // Redirect to landing page
            }
        }
    });
};
