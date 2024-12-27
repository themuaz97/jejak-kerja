<template>
  <div class="flex flex-col p-4 items-center">
    <!-- Left Spacer -->
    <div class="hidden lg:flex flex-1"></div>

    <!-- Main Content -->
     <Toast />
    <div class="flex flex-col w-full lg:w-2/4 gap-8">
      <h1 class="text-3xl font-semibold">Account Settings</h1>
      <Card>
        <template #title>
          Personal Information
        </template>
        <template #content>
          <PersonalInfo />
        </template>
      </Card>

      <Card>
        <template #title>
          Update Password
        </template>
        <template #content>
          <UpdatePassword />
        </template>
      </Card>
    </div>

    <!-- Right Spacer -->
    <div class="hidden lg:flex flex-1"></div>
  </div>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';
import PersonalInfo from './PersonalInfo.vue';
import UpdatePassword from './UpdatePassword.vue';

const toast = useToast();

</script>

<style scoped>
/* Add your styles here */
</style>