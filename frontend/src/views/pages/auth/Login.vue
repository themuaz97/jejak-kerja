<template>
  <Toast />
  <div class="absolute flex justify-end gap-4 pr-6 pt-6 w-full">
    <img src="/demo/images/logo.svg" alt="jejak kerja" class="w-8 h-8">
    <span class="font-medium text-2xl">Jejak Kerja</span>
  </div>
  <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw]">
    <div class="grid grid-cols-2 w-full h-screen">
      <div class="relative bg-purple-400">
        <div class="flex justify-center items-center h-full">
          <img src="/demo/images/auth/login.svg" alt="Login" class="w-1/2 h-1/2">
        </div>
      </div>
      <div class="flex justify-center items-center w-full">
        <div class="flex flex-col items-center gap-4 w-full">
          <div class="flex flex-col gap-4 w-1/2">
            <h1 class="text-3xl font-bold">
              Log in to your Account
            </h1>
            <span class="mb-8">Welcome back! Select method to login : </span>
            <div>
              <Button @click="googleLogin" label="Login with Google" icon="pi pi-google" fluid />
            </div>
            <Divider align="center">
              <span>or continue with email</span>
            </Divider>

            <form @submit.prevent="handleLogin">
              <div class="flex flex-col gap-2">
                <label for="email">Email</label>
                <InputText v-model="email" placeholder="Email" required fluid />
              </div>
              <div class="flex flex-col gap-2">
                <label for="password">Password</label>
                <Password v-model="password" placeholder="Password" required fluid toggleMask />
              </div>
              <div class="flex items-center justify-between mb-8 gap-4">
                <div class="flex items-center">
                  <Checkbox v-model="checked" id="rememberme" binary class="mr-2"></Checkbox>
                  <label for="rememberme">Remember me</label>
                </div>
                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                  @click="$router.push('/auth/forgot-password')">
                  Forgot password?
                </span>
              </div>
              <Button type="submit" :loading="loading" label="Login" class="w-full" />
            </form>
              <div class="flex flex-row justify-center items-center gap-2">
                <span class="text-end">Don't have an account?</span>
                <Button label="Register here" link @click="$router.push('/auth/register')"
                  style="margin: 0; padding: 0;" />
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login } from '@/services/auth.service';
import { useToast } from 'primevue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const email = ref('');
const password = ref('');
const checked = ref(false);

const loading = ref(false);

const emailError = ref('');
const passwordError = ref('');

const googleLogin = async () => {
  window.location.href = `${import.meta.env.VITE_BACKEND}/auth/google`;
};

const handleLogin = async () => {
  loading.value = true;
  try {
    const input = { email: email.value, password: password.value };
    const { data } = await login(input);
    console.log('response login', data);

    // Save the token to localStorage
    if (data && data.resData.accessToken) {
      localStorage.setItem('accessToken', data.resData.accessToken);
    }

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
    router.push('/dashboard');

  } catch (error) {
    console.error('Login Failed:', error);
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

<style scoped>
/* Add your styles here */
</style>