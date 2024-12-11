<script setup>
import { useLayout } from '@/layout/composables/layout';
import { me } from '@/services/auth.service';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const { onMenuToggle, toggleDarkMode, isDarkTheme } = useLayout();

const router = useRouter();

const profileImg = ref(null);
const isLoading = ref(true);

const menu = ref();
const items = ref([
            {
                label: 'Account',
                icon: 'pi pi-user',
                command: () => {
                    router.push('/account')
                }
            },
            {
                label: 'Sign out',
                icon: 'pi pi-sign-out',
                command: () => {
                    router.push('/')
                }
            }
]);

const toggleAccount = (event) => {
    menu.value.toggle(event);
};

const fetchMe = async () => {
    try {
        const response = await me();

        const data = response.data;
        profileImg.value = data.profile_img || null; // If profile_img is null, set to null
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false; // Set loading to false once the fetch is complete
    }
}

onMounted(() => {
    fetchMe();
})
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

            <button class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-bell"></i>
                        <span>Messages</span>
                    </button>

                    <!-- Avatar Component with Conditional Icon -->
                    <Avatar v-if="!isLoading" :image="profileImg" @click="toggleAccount" class="layout-topbar-action"
                        shape="circle" :icon="!profileImg ? 'pi pi-user' : undefined" />
                        <!-- TODO: fix loading state, pi pi-user wont show up because of layout-topbar-action -->
                    <Avatar v-else icon="pi pi-spin pi-spinner" class="layout-topbar-action" shape="circle" />
                    <!-- <Avatar icon="pi pi-spin pi-spinner" class="layout-topbar-action text-black" shape="circle" /> -->
                    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
                </div>
            </div>
        </div>
    </div>
</template>
