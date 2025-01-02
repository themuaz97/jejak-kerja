<template>
  <div class="absolute flex flex-row items-center gap-4 pl-6 pt-6">
    <img src="/demo/images/logo.svg" alt="jejak kerja" class="w-8 h-8">
    <span class="font-medium text-2xl">Jejak Kerja</span>
  </div>
  <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw]">
    <div class="grid grid-cols-2 w-full h-screen">
      <div class="flex justify-center items-center w-full">
        <div class="flex flex-col items-center gap-4 w-full">
          <div class="flex flex-col gap-4 w-1/2">
            <h1 class="text-3xl font-bold">
              Log in to your Account
            </h1>
            <span class="mb-8">Welcome back! Select method to login : </span>
            <div>
              <Button label="Login with Google" icon="pi pi-google" fluid />
            </div>
            <Divider align="center">
              <span>or continue with email</span>
            </Divider>
            <div class="flex flex-col gap-2">
              <label for="email">Email</label>
              <InputText placeholder="Email" fluid />
            </div>
            <div class="flex flex-col gap-2">
              <label for="password">Password</label>
              <Password placeholder="Password" fluid />
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
            <Button label="Login" class="w-full" />
            <div class="flex flex-row justify-center items-center gap-2">
              <span class="text-end">Don't have an account?</span>
              <Button label="Register here" link @click="$router.push('/auth/register')"
                style="margin: 0; padding: 0;" />
            </div>
          </div>
        </div>
      </div>
      <div class="relative bg-purple-700">
        <div class="flex justify-center items-center h-full">
          <img src="/demo/images/auth/login.svg" alt="Login" class="w-1/2 h-1/2">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Add your styles here */
</style>