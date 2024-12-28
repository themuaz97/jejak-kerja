<template>
  <div class="grid grid-cols-1 m-4 gap-4">
    <div class="flex flex-col gap-4 mb-2">
      <label for="currentPassword">Current Password</label>
      <Password v-model="currentPassword" id="currentPassword" type="text" placeholder="Current Password" fluid toggleMask />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="newPassword">New Password</label>
      <Password v-model="newPassword" id="newPassword" type="text" placeholder="New Password" fluid toggleMask />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="confirmNewPassword">Confirm New Password</label>
      <Password v-model="confirmNewPassword" id="confirmNewPassword" type="email" placeholder="Confirm New Password" fluid toggleMask />
    </div>
    <div class="col-span-1 flex justify-end gap-4">
      <Button label="Save" @click="fetchUpdatePassword" :loading="loading" :disabled="!isChanged" />
    </div>
  </div>
</template>

<script setup>
import { updatePassword } from '@/services/account.service';
import { useToast } from 'primevue';
import { computed, ref } from 'vue';

const toast = useToast();
const loading = ref(false);

const currentPassword = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

// Computed property to check if all fields are empty
const isChanged = computed(() =>
  currentPassword.value.length > 0 ||
  newPassword.value.length > 0 ||
  confirmNewPassword.value.length > 0
);

const fetchUpdatePassword = async () => {
loading.value = true;
  try {
    const { data } = await updatePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value,
      confirmNewPassword: confirmNewPassword.value
    });

    if (data.response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: data.resData.message,
        life: 3000
      });
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: data.resData.message,
        life: 3000
      });
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
