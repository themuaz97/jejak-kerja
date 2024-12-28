<script setup>
import { login } from '@/services/auth.service';
import { useToast } from 'primevue/usetoast';
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
                detail: data.resData.message || 'Login successful',
                life: 3000
            });
            router.push('/dashboard');
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: data.resData.message || 'Login failed',
                life: 3000
            });
        }

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
<!-- TODO: enhance: remember me, invalid checking -->
<template>
    <div
        class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-4">
                        <img src="/demo/images/logo.svg" alt="jejak kerja" class="mx-auto w-16 h-16 mb-4">
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Jejak
                            Kerja!</div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>

                    </div>
                    <div class="flex justify-center items-center gap-4 m-3 p-2 h-20">
                        <button @click="googleLogin" v-tooltip.top="'Google'"
                            class="h-full aspect-square flex items-center justify-center rounded-full text-white dark:text-black shadow-lg hover:shadow-xl bg-purple-400 hover:bg-purple-300 transition-all text-[6vw]">
                            <i class="text-2xl pi pi-google" style="font-size: 1.7rem;"></i>
                        </button>
                    </div>


                    <!-- Divider -->
                    <Divider align="center">
                        <b>OR</b>
                    </Divider>

                    <div>
                        <Toast />
                        <label for="email"
                            class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-4"
                            v-model="email" :class="{ 'p-invalid': emailError }" />

                        <label for="password"
                            class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                        <Password id="password" v-model="password" placeholder="Password" :toggleMask="true"
                            class="mb-4" fluid :feedback="false" :class="{ 'p-invalid': passwordError }"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme" binary class="mr-2"></Checkbox>
                                <label for="rememberme">Remember me</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                                @click="$router.push('/auth/forgot-password')">
                                Forgot password?
                            </span>
                        </div>
                        <div class="flex flex-col gap-4">
                            <Button label="Sign In" class="w-full" :loading="loading" @click="handleLogin" />
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
    </div>
</template>

<style scoped>
.p-invalid {
    border: 1px solid #f87171;
}
</style>
