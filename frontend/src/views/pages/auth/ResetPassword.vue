<script setup>
import { resetPassword } from '@/services/auth.service';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const toast = useToast();
const route = useRoute();
const router = useRouter();

const resetPasswordToken = ref('');
const newPassword = ref('');
const confirmNewPassword = ref('');

const loading = ref(false);

onMounted(() => {
  resetPasswordToken.value = route.query.resetPasswordToken;
})

const handleReset = async () => {
  loading.value = true;
  try {
    const input = { resetPasswordToken: resetPasswordToken.value, newPassword: newPassword.value, confirmNewPassword: confirmNewPassword.value };
    const { data } = await resetPassword(input); 

    if (data.response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: data.resData.message,
        life: 3000
      });
      router.push('/auth/login');
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: data.resData.message,
        life: 3000
      });
    }

  } catch (error) {
    console.error('reset password Failed:', error);

    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error.message,
      life: 3000
    });
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
    <div class="flex flex-col items-center justify-center md:w-6 lg:w-12">
      <div
        style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
        <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
          <div class="text-center mb-8">
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
              Reset Password
            </div>
            <span class="font-medium text-lg">Fill in the form to reset your password</span>
          </div>

          <div class="flex flex-col">
            <Toast />
            <label for="newPassword"
              class="text-surface-900 dark:text-surface-0 font-medium mb-2">New Password</label>
            <Password id="newPassword" placeholder="New Password" class="w-full md:w-[30rem] mb-6"
              v-model="newPassword" fluid toggleMask />
            
              <label for="confirmNewPassword"
              class="text-surface-900 dark:text-surface-0 font-medium mb-2">Confirm New Password</label>
            <Password id="confirmNewPassword" placeholder="Confirm New Password" class="w-full md:w-[30rem] mb-6"
              v-model="confirmNewPassword" fluid toggleMask />

            <Button label="Reset Password" class="w-full" :loading="loading" @click="handleReset" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
