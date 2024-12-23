import AppLayout from '@/layout/AppLayout.vue';
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
                    component: () => import("@/views/Dashboard.vue"),
                },
                {
                    path: "/jobs",
                    name: "job-applications",
                    component: () => import("@/views/pages/job-applications/JobApplication.vue"),
                },
                {
                    path: "/job/add",
                    name: "job-application-add",
                    component: () => import("@/views/pages/job-applications/AddJobApplication.vue"),
                },
                {
                    path: "/admin/configuration",
                    name: "config-general",
                    component: () =>
                        import("@/views/pages/configuration/ConfigTab.vue"),
                },
                {
                    path: "/admin/notification",
                    name: "admin-notification",
                    component: () =>
                        import("@/views/pages/notifications/Notifications.vue"),
                },
                {
                    path: "/account",
                    name: "account",
                    component: () => import("@/views/pages/Account.vue"),
                },
                {
                    path: "/uikit/button",
                    name: "button",
                    component: () => import("@/views/uikit/ButtonDoc.vue"),
                },
                {
                    path: "/uikit/table",
                    name: "table",
                    component: () => import("@/views/uikit/TableDoc.vue"),
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
            path: "/auth/forgot-password",
            name: "forgot-password",
            component: () => import("@/views/pages/auth/ForgotPassword.vue"),
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

export default router;
