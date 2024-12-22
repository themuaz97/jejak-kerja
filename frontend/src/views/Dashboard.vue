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
    <div class="card flex justify-center">
      <Select v-model="selectedCountry" :options="countries" optionLabel="name" placeholder="Select a Country"
        class="w-full md:w-56">
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <img :alt="slotProps.option.label"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
        <template #dropdownicon>
          <i class="pi pi-map" />
        </template>
        <template #header>
          <div class="font-medium p-3">Available Countries</div>
        </template>
        <template #footer>
          <div class="p-3">
            <Button label="Add New" fluid severity="secondary" text size="small" icon="pi pi-plus" />
          </div>
        </template>
      </Select>
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