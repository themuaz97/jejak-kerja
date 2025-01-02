import { useUserStore } from "@/stores/user";

export const protectRoute = (router) => {
    router.beforeEach(async (to, from, next) => {
        const meStore = useUserStore();
        // List of public routes that don't require authentication
        const publicRoutes = [
            "landing",
            "login",
            "login2",
            "register",
            "forgot-password",
            "reset-password",
            "accessDenied",
            "error",
            "notfound",
            "callback",
        ];

        // If the route is public, allow access
        if (publicRoutes.includes(to.name)) {
            return next();
        }

        const accessToken = localStorage.getItem("accessToken");
        
        const refreshTokenExists = document.cookie
            .split("; ")
            .some((cookie) => cookie.startsWith("refreshToken="));
        
        if (!accessToken || !refreshTokenExists) {
            return next({ name: "login" });
        }

        try {
            // Use the store's fetchMe action to validate the session
            if (!meStore.fetched) {
                await meStore.fetchMe();
            }
            next(); // Session is valid, proceed
        } catch (error) {
            console.error("Session validation failed:", error.message);
            if (error.response?.status === 401) {
                console.warn("Refresh token is invalid or expired. Redirecting to login.");
                next({ name: "login" });
            } else {
                next(); // Proceed to other error handling if needed
            }
        }
    });
};

export const protectRouteAdmin = (router) => {
    router.beforeEach(async (to, from, next) => {
        const meStore = useUserStore();

        const adminRoutes = [
            "admin-configuration",
            "admin-notification",
        ];

        // If the route is not an admin route, allow access
        if (!adminRoutes.includes(to.name)) {
            return next();
        }

        const accessToken = localStorage.getItem("accessToken");
        const refreshTokenExists = document.cookie
            .split("; ")
            .some((cookie) => cookie.startsWith("refreshToken="));

        if (!accessToken || !refreshTokenExists) {
            return next({ name: "login" });
        }

        try {
            // Check session validity and user role
            if (!meStore.fetched) {
                await meStore.fetchMe();
            }

            const user = meStore.user;

            if (user?.role?.name === "admin") {
                next(); // User is an admin, proceed
            } else {
                console.warn("User does not have admin privileges. Redirecting to accessDenied.");
                next({ name: "accessDenied" });
            }
        } catch (error) {
            console.error("Error validating user role:", error.message);
            if (error.response?.status === 401) {
                console.warn("Session expired or invalid. Redirecting to login.");
                next({ name: "login" });
            } else {
                next({ name: "error" }); 
            }
        }
    });
};