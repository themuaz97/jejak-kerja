<template>
  <div>
    <!-- TODO: styling account -->
    <Card>
      <template #title>
        Account
      </template>
      <template #content>
        <p>Use this page to manage your account.</p>
      </template>
      
    </Card>
  </div>
</template>

<script setup>
import { me } from '@/services/auth.service';
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';

const toast = useToast();

const fetchMe = async () => {
  try {
    const {data} = await me();

    const dataMe = data.resData;

    console.log('respons', dataMe);
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
  }
}

onMounted(() => {
  fetchMe();
})
</script>

<style scoped>
/* Add your styles here */
</style>