<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-between items-center">
      <label for="deleteAccount">Once you delete your account, it will be hard to recover. Please be certain.</label>
      <Button @click="confirmDelete()" label="Delete" icon="pi pi-trash" severity="danger" />
    </div>
  </div>
</template>

<script setup>
import { logout } from '@/services/auth.service';
import { deleteUser } from '@/services/configuration.service';
import { useUserStore } from '@/stores/user';
import { useConfirm, useToast } from 'primevue';
import { useRouter } from 'vue-router';

const meStore = useUserStore();

const router = useRouter();
const toast = useToast();
const confirm = useConfirm();

const confirmDelete = async (event) => {
  const userId = meStore.user?.id; // Retrieve the user ID from the store

  if (!userId) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'User ID not found. Unable to delete account.',
      life: 3000,
    });
    return;
  }

  confirm.require({
    message: 'Are you sure you want to delete your account?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      const { data } = await deleteUser(userId)

      if (data.response.status === 200) {
        toast.add({
          severity: "success",
          summary: "Success",
          detail: data.resData.message,
          life: 3000,
        });
        await logout();
        localStorage.removeItem("accessToken");
        router.push("/");
      } else {
        toast.add({
          severity: "error",
          summary: "Error",
          detail: data.resData.message,
          life: 3000,
        });
      }
    },
  });
};
</script>

<style scoped>
/* Add your styles here */
</style>