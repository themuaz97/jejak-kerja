<template>
  <div class="flex justify-between mx-4" style="margin: 0px; padding: 0px;">
    <DatePicker v-model="date" view="month" class="w-1/2" showIcon iconDisplay="input"
      @update:modelValue="handleDateChange" />
    <Button @click="toggleSortOrder" icon="pi pi-sort-alt" text />
  </div>
  <Card v-for="(job, index) in (visibleDate ? filteredJobApplications : sortedJobApplications)" :key="index"
    @click="viewSelectedJobApplication(job)" style="border: 1px solid var(--surface-border);">
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

  <Button icon="pi pi-plus" @click="visibleAdd = true" rounded style="position: fixed; bottom: 1rem; right: 1rem"
    :tooltipOptions="{ position: 'right' }" />

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

  <!-- Edit drawer -->
  <Drawer v-model:visible="visibleEdit" header="Edit Job Application" position="full">
    <div class="flex flex-col gap-2" style="height: 100%;">
      <div class="flex flex-col gap-2">
        <label for="position"><span class="text-red-600">*</span> Position</label>
        <InputText v-model="viewJobApplication.position" id="position" type="text" placeholder="Position" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="position_level"><span class="text-red-600">*</span> Position Level</label>
        <Select v-model="viewJobApplication.position_level" editable :options="positionLevels" optionLabel="name"
          optionValue="name" placeholder="Select Position Level"
          v-tooltip="'You may create a new position level if it does not exist'" fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="Company"><span class="text-red-600">*</span> Company</label>
        <InputText v-model="viewJobApplication.company" id="Company" type="text" placeholder="Company" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="platform"><span class="text-red-600">*</span> Platform</label>
        <Select v-model="viewJobApplication.platform" editable :options="platforms" optionLabel="name"
          optionValue="name" placeholder="Select Platform"
          v-tooltip="'You may create a new platform if it does not exist'" fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="expected_salary"><span class="text-red-600">*</span> Expected Salary</label>
        <InputNumber v-model="viewJobApplication.expected_salary" inputId="minmaxfraction" :minFractionDigits="2"
          placeholder="Expected Salary" fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="offered_salary">Offered Salary</label>
        <InputNumber v-model="viewJobApplication.offered_salary" inputId="minmaxfraction" :minFractionDigits="2"
          placeholder="Offered Salary" fluid />
      </div>
      <div class="flex flex-col gap-2">
        <label for="job_status"><span class="text-red-600">*</span> Job Status</label>
        <Select v-model="viewJobApplication.apply_status_id" :options="applicationStatus" optionLabel="name"
          optionValue="id" placeholder="Select Job Status">
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
        <InputText v-model="viewJobApplication.location" id="location" type="text" placeholder="Location" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="remarks">Remarks</label>
        <Textarea v-model="viewJobApplication.remarks" rows="3" placeholder="Remarks" autoResize />
      </div>
      <div class="flex flex-col justify-center items-center gap-2 mb-4">
        <label for="reviews">Company Reviews</label>
        <Rating v-model="viewJobApplication.apply_overall_id" class="flex items-center h-full" />
      </div>
      <div class="flex justify-center gap-4">
        <Button label="Cancel" severity="secondary" @click="visibleEdit = false" size="small" />
        <Button label="Save" @click="fetchUpdateJobApplication" size="small" />
      </div>
      <br>
    </div>
  </Drawer>
</template>

<script setup>
import { addJobApplication, updateJobApplication } from '@/services/jobApplication.service';
import { useApplicationStatusStore } from '@/stores/applicationStatus';
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  jobApplications: {
    type: Array,
    required: true,
  },
  filterDate: {
    type: Date,
    required: true,
  },
});

const emit = defineEmits(['refreshData', 'update:filterDate']);

const applicationStatusStore = useApplicationStatusStore();

const toast = useToast();

const visibleDate = ref(false);
const visibleAdd = ref(false);
const visibleEdit = ref(false);

const applicationStatus = computed(() => applicationStatusStore.applicationStatus);
const viewJobApplication = ref({ id: null, position: '', position_level: '', company: '', platform: '', expected_salary: '', offered_salary: '', location: '', apply_status_id: '', apply_overall_id: '', remarks: '' });

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

const date = ref(props.filterDate);

const filteredJobApplications = computed(() => {
  if (!props.filterDate) {
    return props.jobApplications;
  }

  const selectedDate = new Date(props.filterDate);

  return props.jobApplications.filter((app) => {
    const appDate = new Date(app.created_at);
    return (
      appDate.getFullYear() === selectedDate.getFullYear() &&
      appDate.getMonth() === selectedDate.getMonth()
    );
  });
});

const sortOrder = ref('desc');

const sortedJobApplications = computed(() => {
  return [...filteredJobApplications.value].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    if (sortOrder.value === 'asc') {
      return dateA - dateB; // Ascending order
    } else {
      return dateB - dateA; // Descending order
    }
  });
});

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
};

const handleDateChange = (newDate) => {
  date.value = newDate;
  emit('update:filterDate', newDate); // Update filterDate in the parent component
  visibleDate.value = false;
};

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

      emit('refreshData');
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

const viewSelectedJobApplication = (job) => {
  viewJobApplication.value = { ...job };
  visibleEdit.value = true;
};

const fetchUpdateJobApplication = async () => {
  try {
    const { data } = await updateJobApplication(viewJobApplication.value.id, {
      position: viewJobApplication.value.position,
      positionLevel: viewJobApplication.value.position_level,
      company: viewJobApplication.value.company,
      platform: viewJobApplication.value.platform,
      expectedSalary: viewJobApplication.value.expected_salary,
      offeredSalary: viewJobApplication.value.offered_salary,
      location: viewJobApplication.value.location,
      applyStatusId: viewJobApplication.value.apply_status_id,
      applyOverallId: viewJobApplication.value.apply_overall_id,
      remarks: viewJobApplication.value.remarks,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      visibleEdit.value = false;
      emit('refreshData');
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      });
    }
  } catch (error) {
    console.error("Error updating job application:", error.resData.message);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.resData.message,
      life: 3000,
    });
  }
};

onMounted(() => {
  applicationStatusStore.fetchApplicationStatus();
});
</script>

<style scoped>
/* Add your styles here */
</style>