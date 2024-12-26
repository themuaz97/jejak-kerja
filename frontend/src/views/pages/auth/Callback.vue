<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();

onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('accessToken');

  if (token) {
    localStorage.setItem('accessToken', token);

    // Redirect the user to the appropriate page
    router.push({ name: 'dashboard' }); 
  } else {
    console.error('Token is missing in URL parameters.');
    router.push({ name: 'login' }); // Redirect to login page if no token is found
  }
});
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-4 h-screen">
    <i class="pi pi-spin pi-spinner" style="font-size: 4rem;" />
    <p>Authenticating... Please wait.</p>
  </div>
</template>
