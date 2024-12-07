<script setup>
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <div v-if="!isDarkTheme">
                    <img src="/demo/images/logo.svg" class="rounded-xl" alt="" height="35px" width="35px">
                </div>
                <div v-else>
                    <img src="/demo/images/logo-white.svg" class="rounded-xl" alt="" height="35px" width="35px">
                </div>

                <span class="text-lg sm:text-base md:text-xl">Jejak Kerja</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>