<template>
  <div class="card">
    <div class="flex justify-end">
      <IconField>
        <InputText placeholder="Search Jobs" style="width: 300px" />
        <InputIcon>
          <i class="pi pi-search" @click="handleSearch" />
        </InputIcon>
      </IconField>
    </div>

    <!-- DataView with Loading State -->
    <DataView v-if="!loading" :value="jobs">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4"
              :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
              <div class="relative">
                <img class="block xl:block mx-auto rounded w-full" :src="`${item.employer_logo}`"
                  alt="image" />
              </div>
              <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                <div class="flex flex-row md:flex-col justify-between items-start">
                    <Button :label="item.job_title" unstyled
                      class="p-0 text-xl font-semibold text-primary hover:text-primary-600 hover:underline bg-transparent border-none shadow-none" />
                      <span>{{ item.employer_name }}</span>
                      <span class="text-sm text-surface-400">{{ item.job_location }}</span>
                </div>
                <div class="flex flex-col md:items-end gap-8">
                  <span class="text-xl font-semibold">${{ item.salary }}</span>
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button icon="pi pi-heart" outlined></Button>
                    <Button size="small" 
                    :icon="!item.job_apply_is_direct ? 'pi pi-link' : 'pi pi-external-link'" iconPos="right" label="Apply" @click="handleApply(item)" :loading="applyLoading"
                      class="flex-auto md:flex-initial whitespace-nowrap"></Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
    <div v-else class="flex justify-center items-center h-dvh">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup>
import { searchJobs } from "@/services/rapidApi.service";
import { ref, onMounted } from "vue";

const jobs = ref([]);
const loading = ref(false);
const applyLoading = ref(false);

onMounted(() => {
  fetchSearchJobs();
});

const fetchSearchJobs = async () => {
  loading.value = true;

  const params = {
    query: "jobs in malaysia",
    page: 1,
    num_pages: 1,
    country: "my",
    date_posted: "all",
  };

  try {
    const res = await searchJobs(params);
    jobs.value = res.data.resData.data;
    console.log('log in job search vue', jobs.value);
  } catch (error) {
    console.error("Error fetching jobs:", error);
  } finally {
    loading.value = false;
  }
};

const handleApply = (item) => {
  applyLoading.value = true;
  try {
    if (item?.job_apply_link) {
      item.job_apply_is_direct
        ? window.open(item.job_apply_link, '_blank')
        : (window.location.href = item.job_apply_link);
    }
  } catch (error) {
    console.error("Error applying for job:", error);
  } finally {
    applyLoading.value = false;
  }
};
</script>