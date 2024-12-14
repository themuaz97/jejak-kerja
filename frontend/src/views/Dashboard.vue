<template>
  <div class="card">
    <div class="font-semibold text-xl mb-4">Dashboard</div>
    <p>Use this page to manage your dashboard.</p>
    <div class="grid grid-cols-2">
      <div class="flex flex-col col-span-2">
        <label for="password">Password</label>
        <InputText class="bg-red-500" v-model="password" promptLabel="Choose a password" weakLabel="Too simple"
          mediumLabel="Average complexity" strongLabel="Complex password" toggleMask />
      </div>
      <div class="flex flex-col col-span-2">
        <label for="confirmPassword">Confirm Password</label>
        <Password class="bg-red-500" v-model="confirmPassword" promptLabel="Choose a password" weakLabel="Too simple"
          mediumLabel="Average complexity" strongLabel="Complex password" toggleMask />
      </div>
      <div class="flex flex-col">
        <label for="confirmPassword">Confirm Password</label>
        <Button label="Submit" class="w-full" :loading="loading" variant="text" />
      </div>
      <div>
        <FloatLabel variant="on">
          <InputText id="on_label" v-model="value3" />
          <label for="on_label">On Label</label>
        </FloatLabel>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


const value3 = ref(null);
</script>

<style scoped>
/* Add your styles here */
</style>