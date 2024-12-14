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
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const loading = ref(false);

const passwordsMatch = computed(() => password.value === confirmPassword.value);

const handleRegister = async () => {
  loading.value = true;
  try {
    const input = { firstName: firstName.value, lastName: lastName.value, username: username.value, email: email.value, password: password.value, confirmPassword: confirmPassword.value };
    const { data } = await register(input); // Destructure response and input

    console.log("response register", data);
    if (data.response.status === 200) {
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
<!-- TODO: remember me, register, forgot password, save token -->
<template>
  <div
    class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
    <div class="flex flex-col items-center justify-center">
      <div style="
                    border-radius: 56px;
                    padding: 0.3rem;
                    background: linear-gradient(
                        180deg,
                        var(--primary-color) 10%,
                        rgba(33, 150, 243, 0) 30%
                    );
                ">
        <div class="w-full bg-surface-0 dark:bg-surface-900 py-4 px-8" style="border-radius: 53px">
          <div class="text-center my-4">
            <img src="/demo/images/logo.svg" alt="jejak kerja" class="mx-auto w-16 h-16 mb-4">
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
              Register
            </div>
            <span class="text-muted-color font-medium text-lg">Create a new account. It's quick and easy</span>
          </div>

          <div class="card grid grid-cols-2 gap-4 w-full">
            <Toast />
            <div class="flex flex-col">
              <label for="firstname">First Name</label>
              <InputText id="firstname" v-model="firstName" placeholder="First Name" pe="text" />
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
              <InputText id="password" :type="showPassword ? 'text' : 'password'" v-model="password"
                placeholder="Password" class="w-full" :class="{ 'border-red-500': !passwordsMatch }" />
              <small>Password must be at least 6 characters.</small>
            </div>
            <div class="flex flex-col col-span-2">
              <label for="confirmPassword">Confirm Password</label>
              <InputText id="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword" placeholder="Confirm Password" class="w-full" :class="{ 'border-red-500': !passwordsMatch }" />
            </div>
            <div class="flex flex-col gap-4 col-span-2">
              <Button label="Register" :loading="loading" @click="handleRegister" />
              <Button label="Already have an account?" :loading="loading" @click="$router.push('/auth/login')" text />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-red-500 {
  border: 1px solid #f87171;
}
</style>
