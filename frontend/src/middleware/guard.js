import { me } from "@/services/auth.service";

export const protectRoute = (router) => {
    router.beforeEach(async (to, from, next) => {
        // List of public routes that don't require authentication
        const publicRoutes = [
            "landing",
            "login",
            "register",
            "forgot-password",
            "accessDenied",
            "error",
            "notfound",
        ];

        // If the route is public, allow access
        if (publicRoutes.includes(to.name)) {
            return next();
        }

        // Check if access token exists
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            return next({ name: "login" });
        }

        try {
            // Check session validity by calling me endpoint
            await me();
            next(); // Session is valid, proceed
        } catch (error) {
            console.error("Session validation failed:", error.message);

            // // Remove invalid token
            // localStorage.removeItem("accessToken");

            // Redirect to login page for protected routes
            next({ name: "login" });
        }
    });
};
