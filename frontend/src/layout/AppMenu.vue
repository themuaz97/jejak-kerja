<script setup>
import { onMounted, ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import { useUserStore } from '@/stores/user';

const meStore = useUserStore();

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
            // { label: 'Job Search', icon: 'pi pi-fw pi-search', to: '/jobs/search' },
        ],
    },
    {
        label: 'Job Tracker',
        items: [
            { label: 'Job Application', icon: 'pi pi-fw pi-briefcase', to: '/jobs' },
        ],
    },
]);

const protectRouteAdmin = async () => {
    try {
        // Fetch user data if not already fetched
        if (!meStore.fetched) {
            await meStore.fetchMe();
        }

        const user = meStore.user;

        // If the user has an "admin" role, add the admin configuration menu
        if (user?.role?.name === 'admin') {
            const homeSection = model.value.find(section => section.label === 'Home');
            if (homeSection) {
                homeSection.items.push(
                    { label: 'Job Search', icon: 'pi pi-fw pi-search', to: '/jobs/search' }
                );
            }
            model.value.push(
                {
                label: 'Configuration',
                items: [
                    { label: 'Admin Config', icon: 'pi pi-fw pi-cog', to: '/admin' },
                    { label: 'Landing Config', icon: 'pi pi-fw pi-cog', to: '/admin/landing' },
                    { label: 'Notification', icon: 'pi pi-fw pi-cog', to: '/admin/notification' },
                ],
                }
            );
        }
    } catch (error) {
        console.error('Error checking admin role:', error);
    }
};

onMounted(() => {
    protectRouteAdmin();
});
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
