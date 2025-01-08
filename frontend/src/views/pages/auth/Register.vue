<template>
  <Toast position="top-left" />
  <a href="/" class="absolute flex justify-start gap-4 pl-6 pt-6 w-full">
    <img src="/demo/images/logo.svg" alt="jejak kerja" class="w-8 h-8">
    <span class="font-medium text-2xl">Jejak Kerja</span>
  </a>
  <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw]">
    <div class="grid grid-cols-2 w-full h-screen">
      <div class="flex justify-center items-center w-full">
        <div class="flex flex-col items-center gap-4 w-full">
          <div class="flex flex-col gap-4 w-1/2">
            <h1 class="text-3xl font-bold">
              Register to your Account
            </h1>
            <span class="mb-8">Create a new account. It's quick and easy</span>
            <div>
              <Button @click="googleLogin" label="Signup with Google" icon="pi pi-google" fluid />
            </div>
            <Divider align="center">
              <span>or continue with email</span>
            </Divider>

            <form class="flex flex-col gap-4 w-full" @submit.prevent="handleRegister">
            <div class="grid grid-cols-2 gap-4 w-full">
              <div class="flex flex-col">
                <label for="firstname">First Name</label>
                <InputText id="firstname" v-model="firstName" placeholder="First Name" type="text" />
              </div>
              <div class="flex flex-col">
                <label for="lastname">Last Name</label>
                <InputText id="lastname" v-model="lastName" placeholder="Last Name" type="text" />
              </div>
              <div class="flex flex-col col-span-2">
                <label for="email">Email Address</label>
                <InputText id="email" v-model="email" placeholder="Email Address" type="text" />
              </div>
              <div class="flex flex-col col-span-2">
                <label for="username">Username</label>
                <InputText id="username" v-model="username" placeholder="Username (Optional)" type="text" />
              </div>
              <div class="flex flex-col col-span-2">
                <label for="password">Password</label>
                <Password id="password" v-model="password" promptLabel="Choose a password" weakLabel="Too simple"
                  mediumLabel="Average complexity" strongLabel="Complex password" toggleMask fluid
                  placeholder="Password" v-tooltip="'Password must be at least 6 characters.'" class="w-full"
                  :class="{ 'p-invalid': !passwordsMatch }" />
              </div>
              <div class="flex flex-col col-span-2">
                <label for="confirmPassword">Confirm Password</label>
                <Password id="confirmPassword" promptLabel="Choose a password" weakLabel="Too simple"
                  mediumLabel="Average complexity" strongLabel="Complex password" toggleMask fluid
                  v-model="confirmPassword" placeholder="Confirm Password"
                  v-tooltip="'Password must be at least 6 characters.'" class="w-full"
                  :class="{ 'p-invalid': !passwordsMatch }" />
              </div>
              <div class="flex flex-col gap-4 col-span-2">
                <Button type="submit" label="Register" :loading="loading" />
                <div class="flex flex-row justify-center items-center gap-2">
                  <span class="text-end">Already have an account?</span>
                  <Button label="Login here" link @click="$router.push('/auth/login')"
                    style="margin: 0; padding: 0;" />
                </div>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
      <div class="relative bg-purple-400">
        <div class="flex justify-center items-center h-full">
          <img src="/demo/images/auth/register.svg" alt="Login" class="w-1/2 h-1/2">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { register } from "@/services/auth.service";
import { useToast } from "primevue/usetoast";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const username = ref("");
const password = ref('');
const confirmPassword = ref('');

const loading = ref(false);

const passwordsMatch = computed(() => password.value === confirmPassword.value);

const googleLogin = async () => {
  window.location.href = `${import.meta.env.VITE_BACKEND}/auth/google`;
};

const handleRegister = async () => {
  loading.value = true;
  try {
    const input = { firstName: firstName.value, lastName: lastName.value, username: username.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value };
    const { data } = await register(input); // Destructure response and input

    console.log("response register", data);
    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message || "Register successful",
        life: 3000,
      });
      router.push("/auth/login");
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message || "Register failed",
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Register Failed:", error);

    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.p-invalid {
  border: 1px solid #f87171;
  border-radius: var(--content-border-radius);
}
</style>