<script setup>
import { addJobApplication, getJobApplications, updateJobApplication, deleteJobApplication, getApplyStatus, getApplyOverall } from "@/services/jobApplication.service";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted, computed } from "vue";

const toast = useToast();
const confirm = useConfirm();

const currentMonth = new Date();
currentMonth.setDate(1);

const filterDate = ref(currentMonth);

const jobApplications = ref([]);
const applicationStatuses = ref([]);
const applicationOveralls = ref([]);

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

const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalRecords = ref(0);
const totalPages = ref(0);

const btnAddModal = ref(false);

const btnEditModal = ref(false);
const viewJobApplicationId = ref({ id: null, position: '', position_level: '', company: '', platform: '', expected_salary: '', offered_salary: '', location: '', apply_status_id: '', apply_overall_id: '', remarks: '' });

const position = ref('');
const positionLevel = ref();
const company = ref();
const platform = ref();
const expectedSalary = ref();
const offeredSalary = ref();
const location = ref();
const applyStatusId = ref(null);
const applyOverallId = ref(null);
const remarks = ref();

const filteredApplications = computed(() => {
  if (!filterDate.value) {
    return jobApplications.value;
  }

  const selectedDate = new Date(filterDate.value);

  return jobApplications.value.filter((app) => {
    const appDate = new Date(app.created_at);
    return (
      appDate.getFullYear() === selectedDate.getFullYear() &&
      appDate.getMonth() === selectedDate.getMonth()
    );
  });
});

const formatCurrency = (value) => {
  return value.toLocaleString('en-US', { style: 'currency', currency: 'MYR' });
};

const confirmDelete = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to delete this job application?",
    header: "Confirmation",
    icon: "pi pi-info-circle",
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      try {
        const { data } = await deleteJobApplication(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchJobApplication();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting job application:", error);
      }
    },
  });
};

const fetchJobApplication = async () => {
  try {
    const { data } = await getJobApplications({ page: currentPage.value });

    jobApplications.value = data.resData.jobApplications;
    totalRecords.value = data.resData.meta.totalCount;
    totalPages.value = data.resData.meta.totalPages;
    currentPage.value = data.resData.meta.page;
  } catch (error) {
    console.error("Error fetching application Statuses:", error);
  }
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

      btnAddModal.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
    fetchJobApplication();
  } catch (error) {
    console.error("Error adding job application:", error.resData.message);
  }
};

const viewSelectedJobApplicationId = (jobApplicationId) => {
  const jobApplication = jobApplications.value.find((r) => r.id === jobApplicationId);
  if (jobApplication) {
    viewJobApplicationId.value = { ...jobApplication };
    btnEditModal.value = true;
  }
};

const fetchUpdateJobApplication = async () => {
  try {
    const { data } = await updateJobApplication(viewJobApplicationId.value.id, {
      position: viewJobApplicationId.value.position,
      positionLevel: viewJobApplicationId.value.position_level,
      company: viewJobApplicationId.value.company,
      platform: viewJobApplicationId.value.platform,
      expectedSalary: viewJobApplicationId.value.expected_salary,
      offeredSalary: viewJobApplicationId.value.offered_salary,
      location: viewJobApplicationId.value.location,
      applyStatusId: viewJobApplicationId.value.apply_status_id,
      applyOverallId: viewJobApplicationId.value.apply_overall_id,
      remarks: viewJobApplicationId.value.remarks,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh jobApplications and close modal
      await fetchJobApplication();
      btnEditModal.value = false;
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

const fetchApplicationStatuses = async () => {
  try {
    const { data } = await getApplyStatus({});

    applicationStatuses.value = data.resData.applyStatus;
  } catch (error) {
    console.error("Error fetching application Statuses:", error);
  }
};

const fetchApplicationOverall = async () => {
  try {
    const { data } = await getApplyOverall({});

    applicationOveralls.value = data.resData.applyOverall;
  } catch (error) {
    console.error("Error fetching application Statuses:", error);
  }
};

onMounted(() => {
  fetchJobApplication();
  fetchApplicationStatuses();
  fetchApplicationOverall();
});
</script>

<template>
  <div class="card">
    <div class="flex justify-between gap-4">
      <div class="flex flex-col gap-2">
        <label for="date">Date</label>
        <DatePicker v-model="filterDate" view="month" placeholder="Select a date" showIcon
          iconDisplay="input" dateFormat="mm/yy" variant="filled" />
      </div>
    </div>
    <div class="my-2 py-2">
      <Divider />
    </div>
    <div>
      <Toast />
      <ConfirmPopup />
      <DataTable :value="filteredApplications" paginator :rows="rowsPerPage" :totalRecords="totalRecords"
        :first="(currentPage - 1) * rowsPerPage"
        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :currentPage="currentPage - 1"
        stripedRows tableStyle="min-width: 50rem">
        <template #header>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold">Job Application</span>
            <Button label="Add" icon="pi pi-plus" class="p-button-primary" @click="btnAddModal = true" />
          </div>
        </template>
        <template #empty>
          <div class="text-center py-4 text-gray-500">No Job Application found!</div>
        </template>
        <Column header="#" style="width: 3%">
          <template #body="slotProps">
            {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
          </template>
        </Column>
        <Column field="position" header="Position" sortable style="width: 10%;"></Column>
        <Column field="position_level" header="Position Level" style="width: 10%;">
          <template #body="slotProps">
            {{
            positionLevels.find(level => level.value === slotProps.data.position_level)?.name ||
            slotProps.data.position_level
            }}
          </template>
        </Column>
        <Column field="company" header="Company Name" style="width: 15%;"></Column>
        <Column field="platform" header="Platform"></Column>
        <!-- <Column field="location" header="Location"></Column> -->
        <Column field="expected_salary" header="Expected Salary" sortable>
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.expected_salary) }}
          </template>
        </Column>
        <!-- <Column field="offered_salary" header="Offered Salary"></Column> -->
        <Column field="application_status.name" header="Status" sortable
          style="width: 7%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
          <template #body="slotProps">
            <Badge :severity="slotProps.data.application_status.color_code">
              {{ slotProps.data.application_status.name }}
            </Badge>
          </template>
        </Column>
        <Column field="apply_overall_id" header="Company Review">
          <template #body="slotProps">
            <Rating :modelValue="slotProps.data.application_overall?.id" readonly />
          </template>
        </Column>
        <Column field="remarks" header="Remarks"></Column>
        <Column header="Action" style="width: 10%;" frozen alignFrozen="right">
          <template #body="slotProps">
            <Button v-if="slotProps.data.is_active" @click="viewSelectedJobApplicationId(slotProps.data.id)"
              icon="pi pi-pencil" class="p-button-sm p-button-primary mr-2" rounded />
            <Button v-if="slotProps.data.is_active" @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
              class="p-button-sm p-button-danger" rounded />
            <Button v-else @click="confirmActivate($event, slotProps.data.id)" icon="pi pi-undo"
              class="p-button-sm p-button-contrast" rounded />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Dialog modal add -->
    <Dialog v-model:visible="btnAddModal" modal header="Add Job Application" :style="{ width: '40rem' }">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div class="col-span-1 flex flex-col gap-4">
          <label for="Position"><span class="text-red-600">*</span> Position</label>
          <InputText v-model="position" id="Position" type="text" placeholder="Position" />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="position_level">Position Level</label>
          <Select v-model="positionLevel" editable :options="positionLevels" optionLabel="name" optionValue="name"
            placeholder="Select Position Level" v-tooltip="'You may create a new position level if it does not exist'"
            fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="Company"><span class="text-red-600">*</span> Company</label>
          <InputText v-model="company" id="Company" type="text" placeholder="Company" />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="platform"><span class="text-red-600">*</span> Platform</label>
          <Select v-model="platform" editable :options="platforms" optionLabel="name" optionValue="name"
            placeholder="Select Platform" v-tooltip="'You may create a new platform if it does not exist'" fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="expected_salary"><span class="text-red-600">*</span> Expected Salary</label>
          <InputNumber v-model="expectedSalary" inputId="minmaxfraction" :minFractionDigits="2"
            placeholder="Expected Salary" fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="offered_salary">Offered Salary</label>
          <InputNumber v-model="offeredSalary" inputId="minmaxfraction" :minFractionDigits="2"
            placeholder="Offered Salary" fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="job_status"><span class="text-red-600">*</span> Job Status</label>
          <Select v-model="applyStatusId" :options="applicationStatuses" optionLabel="name" optionValue="id"
            placeholder="Select Job Status">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <Badge :severity="applicationStatuses.find(status => status.id === slotProps.value)?.color_code"
                  style="margin-right: 8px;">
                  {{ applicationStatuses.find(status => status.id === slotProps.value)?.name }}
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
        <div class="col-span-1 flex flex-col gap-4">
          <label for="location">Location</label>
          <InputText v-model="location" id="location" type="text" placeholder="Location" />
        </div>
        <div class="col-span-2 flex flex-col gap-4">
          <label for="remarks">Remarks</label>
          <Textarea v-model="remarks" rows="3" placeholder="Remarks" autoResize />
        </div>
        <div class="col-span-2 flex flex-col justify-center items-center gap-4 mb-4">
          <label for="reviews">Company Reviews</label>
          <Rating v-model="applyOverallId" class="flex items-center h-full" />
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <Button type="button" label="Cancel" severity="secondary" @click="btnAddModal = false"></Button>
        <Button type="button" label="Save" @click="fetchAddJobApplication"></Button>
      </div>
    </Dialog>

    <!-- Dialog modal edit -->
    <Dialog v-model:visible="btnEditModal" modal header="Edit Job Application" :style="{ width: '40rem' }">
      <div class="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
        <div class="col-span-1 flex flex-col gap-4">
          <label for="Position"><span class="text-red-600">*</span> Position</label>
          <InputText v-model="viewJobApplicationId.position" id="Position" type="text" placeholder="Position" />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="position_level">Position Level</label>
          <Select v-model="viewJobApplicationId.position_level" editable :options="positionLevels" optionLabel="name"
            optionValue="name" placeholder="Select Position Level"
            v-tooltip="'You may create a new position level if it does not exist'" fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="Company"><span class="text-red-600">*</span> Company</label>
          <InputText v-model="viewJobApplicationId.company" id="Company" type="text" placeholder="Company" />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="platform"><span class="text-red-600">*</span> Platform</label>
          <Select v-model="viewJobApplicationId.platform" editable :options="platforms" optionLabel="name"
            optionValue="name" placeholder="Select Platform"
            v-tooltip="'You may create a new platform if it does not exist'" fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="expected_salary"><span class="text-red-600">*</span> Expected Salary</label>
          <InputNumber v-model="viewJobApplicationId.expected_salary" inputId="minmaxfraction" :minFractionDigits="2"
            placeholder="Expected Salary" fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="offered_salary">Offered Salary</label>
          <InputNumber v-model="viewJobApplicationId.offered_salary" inputId="minmaxfraction" :minFractionDigits="2"
            placeholder="Offered Salary" fluid />
        </div>
        <div class="col-span-1 flex flex-col gap-4">
          <label for="job_status"><span class="text-red-600">*</span> Job Status</label>
          <Select v-model="viewJobApplicationId.apply_status_id" :options="applicationStatuses" optionLabel="name"
            optionValue="id" placeholder="Select Job Status">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <Badge :severity="applicationStatuses.find(status => status.id === slotProps.value)?.color_code"
                  style="margin-right: 8px;">
                  {{ applicationStatuses.find(status => status.id === slotProps.value)?.name }}
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
        <div class="col-span-1 flex flex-col gap-4">
          <label for="location">Location</label>
          <InputText v-model="viewJobApplicationId.location" id="location" type="text" placeholder="Location" />
        </div>
        <div class="col-span-2 flex flex-col gap-4">
          <label for="remarks">Remarks</label>
          <Textarea v-model="viewJobApplicationId.remarks" rows="3" placeholder="Remarks" autoResize />
        </div>
        <div class="col-span-2 flex flex-col justify-center items-center gap-4 mb-4">
          <label for="reviews">Company Reviews</label>
          <Rating v-model="viewJobApplicationId.apply_overall_id" class="flex items-center h-full" />
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnEditModal = false"></Button>
        <Button type="button" label="Save" @click="fetchUpdateJobApplication"></Button>
      </div>
    </Dialog>
  </div>
</template>