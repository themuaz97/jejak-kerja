<script setup>
import { login } from '@/services/auth.service';
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const checked = ref(false);

const handleLogin = async () => {
  try {
    const data = { email: email.value, password: password.value };
    const response = await login(data);
    console.log('Login Successful:', response);
  } catch (error) {
    console.error('Login Failed:', error.message);
  }
};

</script>
<!-- TODO: remember me, register, forgot password, save token -->
<template>
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <img src="/demo/images/logo.svg" alt="jejak kerja" class="mx-auto w-32 h-32 mb-4">
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Jejak Kerja!</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                        </div>
                        <Button label="Sign In" class="w-full" as="router-link" to="/" @click="handleLogin"></Button>
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
