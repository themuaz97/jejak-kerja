<template>
  <Card v-for="(job, index) in jobApplications" :key="index" style="border: 1px solid var(--surface-border);">
    <template #title>
      <div class="flex justify-between">
        <span>{{ job.position }}</span>
        <span>
          <Badge :severity="job.application_status.color_code">{{ job.application_status.name }}</Badge>
        </span>
      </div>
    </template>
    <template #subtitle>{{ job.company }}</template>
    <template #content>
      <div class="flex flex-col gap-1 text-sm">
        <span>{{ job.location }}</span>
        <span>{{ job.platform }}</span>
      </div>
    </template>
  </Card>

  <SpeedDial :model="items" style="position: fixed; bottom: 1rem; right: 1rem"
    :tooltipOptions="{ position: 'right' }" />

  <!-- date drawer -->
  <Drawer v-model:visible="visibleDate" header="Select a date" position="full">
    <div class="flex justify-center items-center" style="height: 100%;">
      <DatePicker v-model="date" inline view="month" class="w-full sm:w-[30rem]" />
    </div>
  </Drawer>

  <!-- add drawer -->
  <Drawer v-model:visible="visibleAdd" header="Add Job Application" position="full">
    <div class="flex flex-col gap-2" style="height: 100%;">
      <div class="flex flex-col gap-2">
        <label for="position"><span class="text-red-600">*</span> Position</label>
        <InputText v-model="position" id="position" type="text" placeholder="Position" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="position_level"><span class="text-red-600">*</span> Position Level</label>
        <Select v-model="positionLevel" editable :options="positionLevels" optionLabel="name" optionValue="name"
          placeholder="Select Position Level" v-tooltip="'You may create a new position level if it does not exist'"
          fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="Company"><span class="text-red-600">*</span> Company</label>
        <InputText v-model="company" id="Company" type="text" placeholder="Company" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="platform"><span class="text-red-600">*</span> Platform</label>
        <Select v-model="platform" editable :options="platforms" optionLabel="name" optionValue="name"
          placeholder="Select Platform" v-tooltip="'You may create a new platform if it does not exist'" fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="expected_salary"><span class="text-red-600">*</span> Expected Salary</label>
        <InputNumber v-model="expectedSalary" inputId="minmaxfraction" :minFractionDigits="2"
          placeholder="Expected Salary" fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="offered_salary">Offered Salary</label>
        <InputNumber v-model="offeredSalary" inputId="minmaxfraction" :minFractionDigits="2"
          placeholder="Offered Salary" fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="job_status"><span class="text-red-600">*</span> Job Status</label>
        <Select v-model="applyStatusId" :options="applicationStatus" optionLabel="name" optionValue="id"
          placeholder="Select Job Status">
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <Badge :severity="applicationStatus.find(status => status.id === slotProps.value)?.color_code"
                style="margin-right: 8px;">
                {{ applicationStatus.find(status => status.id === slotProps.value)?.name }}
              </Badge>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>

          <template #option="slotProps">
            <div class="flex items-center">
              <Badge :severity="slotProps.option.color_code" style="margin-right: 8px;">
                {{ slotProps.option.name }}
              </Badge>
            </div>
          </template>
        </Select>
      </div>
      <div class="flex flex-col gap-2">
        <label for="location">Location</label>
        <InputText v-model="location" id="location" type="text" placeholder="Location" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="remarks">Remarks</label>
        <Textarea v-model="remarks" rows="3" placeholder="Remarks" autoResize />
      </div>
      <div class="flex flex-col justify-center items-center gap-2 mb-4">
        <label for="reviews">Company Reviews</label>
        <Rating v-model="applyOverallId" class="flex items-center h-full" />
      </div>
      <div class="flex justify-center gap-4">
        <Button label="Cancel" severity="secondary" @click="visibleAdd = false" size="small" />
        <Button label="Save" @click="fetchAddJobApplication" size="small" />
      </div>
      <br>
    </div>
  </Drawer>
</template>

<script setup>
import { addJobApplication } from '@/services/jobApplication.service';
import { useApplicationStatusStore } from '@/stores/applicationStatus';
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  jobApplications: {
    type: Array,
    required: true,
  },
});

const applicationStatusStore = useApplicationStatusStore();

const toast = useToast();

const visibleDate = ref(false);
const visibleAdd = ref(false);

const applicationStatus = computed(() => applicationStatusStore.applicationStatus);

const positionLevels = ref(
  [
    { name: "Intern" },
    { name: "Non Executive" },
    { name: "Entry Level" },
    { name: "Mid Level" },
    { name: "Senior Level" },
    { name: "First Level Management" },
    { name: "Senior Level Management" },
    { name: "Executive Management" },
    { name: "Board of Directors" },
  ].map((item, index) => ({ id: index + 1, name: item.name }))
);

const platforms = ref(
  [
    { name: "LinkedIn" },
    { name: "JobStreet" },
    { name: "Indeed" },
    { name: "Glassdoor" },
    { name: "Foundit" },
    { name: "Hiredly" },
  ].map((item, index) => ({ id: index + 1, name: item.name }))
);

const items = ref([
  {
    label: 'Add',
    icon: 'pi pi-plus',
    command: () => {
      toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
      visibleAdd.value = true;
    }
  },
  {
    label: 'Date',
    icon: 'pi pi-calendar',
    command: () => {
      visibleDate.value = true;
    }
  },
])

const position = ref('');
const positionLevel = ref('');
const company = ref('');
const platform = ref('');
const expectedSalary = ref('');
const offeredSalary = ref('');
const applyStatusId = ref(null);
const location = ref('');
const remarks = ref('');
const applyOverallId = ref(null);

const fetchAddJobApplication = async () => {
  try {
    const input = { position: position.value, positionLevel: positionLevel.value, company: company.value, platform: platform.value, expectedSalary: expectedSalary.value, offeredSalary: offeredSalary.value, location: location.value, applyStatusId: applyStatusId.value, applyOverallId: applyOverallId.value, remarks: remarks.value };
    const { data } = await addJobApplication(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      position.value = '';
      positionLevel.value = '';
      company.value = '';
      platform.value = '';
      expectedSalary.value = '';
      offeredSalary.value = '';
      location.value = '';
      applyStatusId.value = '';
      applyOverallId.value = '';
      remarks.value = '';

      visibleAdd.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
  } catch (error) {
    console.error("Error adding job application:", error.resData.message);
  }
};

onMounted(() => {
  applicationStatusStore.fetchApplicationStatus();
});
</script>

<style scoped>
/* Add your styles here */
</style>