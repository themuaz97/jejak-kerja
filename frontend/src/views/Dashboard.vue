<template>
  <!-- TODO: chart for job status count, total count job application, chart for platform count, top platform, top position dashboard topbar show interview tips -->
   <!-- TODO: job api integration -->
  <div class="grid grid-cols-4 gap-4">
    <Card>
      <template #title>
        Job Status
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">Chart</div>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>
        Total Job Application
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">Chart</div>
        </div>
      </template>
    </Card>

    <Card>
      <template #title>
        Top Platform Applied
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">Chart</div>
        </div>
      </template>
    </Card>
    <Card>
      <template #title>
        Top Platform Applied
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center">Chart</div>
        </div>
      </template>
    </Card>
    <div class="col-span-4">
      <Card>
        <template #title>
          Interview Tips
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <div class="flex justify-between items-center">Chart</div>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';


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