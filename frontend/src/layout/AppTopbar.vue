<script setup>
import { useLayout } from "@/layout/composables/layout";
import { useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { logout } from "@/services/auth.service";

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();
const router = useRouter();

const userStore = useUserStore(); 
const isLoading = computed(() => userStore.loading); 
const profileImg = computed(() => userStore.user?.profile_img); 

const menu = ref();
const items = ref([
    {
        label: "Account",
        icon: "pi pi-user",
        command: () => {
            router.push("/account");
        },
    },
    {
        label: "Sign out",
        icon: "pi pi-sign-out",
        command: async () => {
            try {
                await logout();
            } catch (error) {
                console.error("Error during logout:", error);
            } finally {
                localStorage.removeItem("accessToken");
                router.push("/");
            }
        },
    },
]);

const toggleAccount = (event) => {
    menu.value.toggle(event);
};
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="onMenuToggle">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/dashboard" class="layout-topbar-logo">
                <div v-if="!isDarkTheme">
                    <img src="/demo/images/logo.svg" class="rounded-xl" alt="" height="35px" width="35px" />
                </div>
                <div v-else>
                    <img src="/demo/images/logo-white.svg" class="rounded-xl" alt="" height="35px" width="35px" />
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

            <button class="layout-topbar-menu-button layout-topbar-action" v-styleclass="{
                selector: '@next',
                enterFromClass: 'hidden',
                enterActiveClass: 'animate-scalein',
                leaveToClass: 'hidden',
                leaveActiveClass: 'animate-fadeout',
                hideOnOutsideClick: true,
            }">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <!-- <button type="button" class="layout-topbar-action">
                        <i class="pi pi-bell"></i>
                        <span>Messages</span>
                    </button> -->

                    <!-- Avatar Component with Conditional Icon -->
                    <button v-if="!isLoading && profileImg" @click="toggleAccount" class="layout-topbar-action">
                        <Avatar :image="profileImg" shape="circle" :icon="!profileImg ? 'pi pi-user' : undefined" />
                        <span class="ml-2">{{ userStore.user?.username }}</span>
                    </button>
                    <button v-else-if="!isLoading && !profileImg" @click="toggleAccount" class="layout-topbar-action">
                        <i class="pi pi-user" />
                    </button>
                    <button v-else><i class="pi pi-spin pi-spinner"></i></button>
                    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                </div>
            </div>
        </div>
    </div>
</template>
