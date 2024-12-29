<template>
  <!-- TODO: job api integration -->
  <div class="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
    <AnalyticCount />

    <div class="md:col-span-2 sm:col-span-1">
      <Card>
        <template #title>
          Job Application By Status
        </template>
        <template #content>
          <JobApplicationByStatus />
        </template>
      </Card>
    </div>

    <div class="md:col-span-2 sm:col-span-1">
      <Card>
        <template #title>
          Job Application By Platform
        </template>
        <template #content>
          <JobApplicationByPlatform />
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import JobApplicationByStatus from './JobApplicationByStatus.vue';
import JobApplicationByPlatform from './JobApplicationByPlatform.vue';
import AnalyticCount from './AnalyticCount.vue';


const value3 = ref(null);
const selectedCountry = ref(null);
const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' },
]);
</script>

<style scoped>
/* Add your styles here */
</style>