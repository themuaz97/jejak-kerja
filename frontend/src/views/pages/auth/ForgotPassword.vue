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

// TODO: invalid, forgot password api
const handleLogin = async () => {
    loading.value = true;
    try {
        const input = { email: email.value, password: password.value };
        const { data } = await login(input); // Destructure response and input
        console.log('response login', data);
        
        // Save the token to localStorage
        if (data && data.response.accessToken) {
            localStorage.setItem('accessToken', data.response.accessToken);
        }

        // Ensure you're using the correct toast method and parameters
        if (data.response.status === 200) {
            toast.add({ 
                severity: 'success', 
                summary: 'Success', 
                detail: data.message || 'Login successful', 
                life: 3000 
            });
            router.push('/dashboard');
        } else {
            toast.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: data.message || 'Login failed', 
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
<!-- TODO: remember me, register, forgot password, save token -->
<template>
    <div
        class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center md:w-6 lg:w-12">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                      <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                        Forgot Password
                      </div>
                      <span class="font-medium text-lg">Enter the email address associated with your account and we'll send you a link to reset your password</span>
                    </div>

                    <div class="flex flex-col">
                        <Toast />
                          <label for="email1"
                              class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                          <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-[30rem] mb-6"
                              v-model="email" />

                        <Button label="Forgot Password" class="w-full" :loading="loading" @click="handleLogin" />
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
