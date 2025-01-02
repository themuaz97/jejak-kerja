import AppLayout from '@/layout/AppLayout.vue';
import { protectRoute, protectRouteAdmin } from '@/middleware/guard';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "landing",
            component: () => import("@/views/pages/Landing.vue"),
        },
        {
            path: "/",
            component: AppLayout,
            children: [
                {
                    path: "/dashboard",
                    name: "dashboard",
                    component: () => import("@/views/pages/dashboard/Dashboard.vue"),
                },
                {
                    path: "/jobs",
                    name: "job-applications",
                    component: () => import("@/views/pages/job-applications/JobApplication.vue"),
                },
                {
                    path: "/admin",
                    name: "admin-configuration",
                    component: () =>
                        import("@/views/pages/configuration/ConfigTab.vue"),
                },
                {
                    path: "/admin/landing",
                    name: "admin-landing",
                    component: () =>
                        import("@/views/pages/configuration-landing/LandingConfigTab.vue"),
                },
                {
                    path: "/admin/notification",
                    name: "admin-notification",
                    component: () =>
                        import("@/views/pages/configuration-notifications/Notifications.vue"),
                },
                {
                    path: "/account",
                    name: "account",
                    component: () => import("@/views/pages/account/Account.vue"),
                },
            ],
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notfound",
            component: () => import("@/views/pages/NotFound.vue"),
        },
        {
            path: "/auth/register",
            name: "register",
            component: () => import("@/views/pages/auth/Register.vue"),
        },
        {
            path: "/auth/login",
            name: "login",
            component: () => import("@/views/pages/auth/Login.vue"),
        },
        {
            path: "/auth/login2",
            name: "login2",
            component: () => import("@/views/pages/auth/Login2.vue"),
        },
        {
            path: "/auth/callback",
            name: "callback",
            component: () => import("@/views/pages/auth/Callback.vue"),
        },
        {
            path: "/auth/forgot-password",
            name: "forgot-password",
            component: () => import("@/views/pages/auth/ForgotPassword.vue"),
        },
        {
            path: "/auth/reset-password",
            name: "reset-password",
            component: () => import("@/views/pages/auth/ResetPassword.vue"),
        },
        {
            path: "/auth/access",
            name: "accessDenied",
            component: () => import("@/views/pages/auth/Access.vue"),
        },
        {
            path: "/auth/error",
            name: "error",
            component: () => import("@/views/pages/auth/Error.vue"),
        },
    ],
});

protectRoute(router);
protectRouteAdmin(router);

export default router;
