<script setup>
import { activateApplicationStatus, addApplicationStatus, deleteApplicationStatus, getApplicationStatus, updateApplicationStatus } from "@/services/configuration.service";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from "vue";

const toast = useToast();
const confirm = useConfirm();

const applicationStatuses = ref([]);
const severities = ref([
  { name: "primary", value: "primary" },
  { name: "secondary", value: "secondary" },
  { name: "success", value: "success" },
  { name: "info", value: "info" },
  { name: "warn", value: "warn" },
  { name: "help", value: "help" },
  { name: "danger", value: "danger" },
  { name: "contrast", value: "contrast" },
]);

const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalRecords = ref(0);
const totalPages = ref(0);

const btnAddModal = ref(false);

const btnEditModal = ref(false);
const viewApplicationStatusId = ref({ id: null, name: "", color_code: "", is_active: false });

const applicationStatusName = ref('');
const applicationStatusColorCode = ref('');

const getSeverity = (status) => {
  switch (status) {
    case true:
      return 'success';

    case false:
      return 'danger';
  }
}

const confirmDelete = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to delete this application status?",
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
        const { data } = await deleteApplicationStatus(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchApplicationStatuses();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting application status:", error);
      }
    },
  });
};

const confirmActivate = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to activate this application status?",
    header: "Confirmation",
    icon: "pi pi-info-circle",
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Activate',
      severity: 'success'
    },
    accept: async () => {
      try {
        const { data } = await activateApplicationStatus(id);

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchApplicationStatuses();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error activating application status:", error);
      }
    },
  });
};

const fetchApplicationStatuses = async () => {
  try {
    const { data } = await getApplicationStatus({ page: currentPage.value });

    applicationStatuses.value = data.resData.applyStatus;
    totalRecords.value = data.resData.meta.totalCount;
    totalPages.value = data.resData.meta.totalPages;
    currentPage.value = data.resData.meta.page;
  } catch (error) {
    console.error("Error fetching application Statuses:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load application statuses",
      life: 3000,
    });
  }
};

const fetchAddApplicationStatus = async () => {
  try {
    const input = { name: applicationStatusName.value, colorCode: applicationStatusColorCode.value };
    const { data } = await addApplicationStatus(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      applicationStatusName.value = '';
      applicationStatusColorCode.value = '';
      btnAddModal.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
    fetchApplicationStatuses();
  } catch (error) {
    console.error("Error adding application status:", error.resData.message);
  }
};

const viewSelectedApplicationStatusId = (applicationStatusId) => {
  const applicationStatus = applicationStatuses.value.find((r) => r.id === applicationStatusId);
  if (applicationStatus) {
    viewApplicationStatusId.value = { ...applicationStatus };
    btnEditModal.value = true;
  }
};

const fetchUpdateApplicationStatus = async () => {
  try {

    const { data } = await updateApplicationStatus(viewApplicationStatusId.value.id, {
      name: viewApplicationStatusId.value.name,
      colorCode: viewApplicationStatusId.value.color_code,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh applicationStatuses and close modal
      await fetchApplicationStatuses();
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
    console.error("Error updating application status:", error.resData.message);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.resData.message,
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchApplicationStatuses();
});
</script>

<template>
  <div class="card">
    <Toast />
    <ConfirmPopup />
    <div class="flex justify-end items-center mb-4">
      <Button label="Add Application Status" icon="pi pi-plus" class="p-button-primary" @click="btnAddModal = true" />
    </div>
    <DataTable v-if="applicationStatuses.length > 0" :value="applicationStatuses" paginator :rows="rowsPerPage"
      :totalRecords="totalRecords" :first="(currentPage - 1) * rowsPerPage"
      paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :currentPage="currentPage - 1" stripedRows
      tableStyle="min-width: 50rem">
      <Column header="#" style="width: 10%">
        <template #body="slotProps">
          {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
        </template>
      </Column>
      <Column field="name" header="Name"></Column>
      <Column field="color_code" header="Color Code">
        <template #body="slotProps">
          <!-- Use the color_code directly for severity -->
          <Badge :severity="slotProps.data.color_code">
            {{ slotProps.data.color_code }}
          </Badge>
        </template>
      </Column>
      <Column field="is_active" header="Status">
        <template #body="slotProps">
          <Tag :severity="getSeverity(slotProps.data.is_active)"
            :value="slotProps.data.is_active ? 'Active' : 'Inactive'" />
        </template>
      </Column>
      <Column header="Action" style="width: 10%;">
        <template #body="slotProps">
          <Button v-if="slotProps.data.is_active" @click="viewSelectedApplicationStatusId(slotProps.data.id)"
            icon="pi pi-pencil" class="p-button-sm p-button-primary mr-2" rounded />
          <Button v-if="slotProps.data.is_active" @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
            class="p-button-sm p-button-danger" rounded />
          <Button v-else @click="confirmActivate($event, slotProps.data.id)" icon="pi pi-undo"
            class="p-button-sm p-button-contrast" rounded />
        </template>
      </Column>
    </DataTable>

    <div v-else class="flex justify-center items-center">
      <p class="text-xl">No application status found</p>
    </div>

    <!-- Dialog modal add -->
    <Dialog v-model:visible="btnAddModal" modal header="Add Application Status" :style="{ width: '25rem' }">
      <div class="flex flex-col gap-4 m-4">
        <label for="applicationStatusName" class="font-semibold w-24"><span class="text-red-600">*</span>Name</label>
        <InputText id="applicationStatusName" v-model="applicationStatusName" class="flex-auto" autocomplete="off"
          placeholder="Application Status Name" />

        <label for="applicationStatusColorCode" class="font-semibold w-24"><span class="text-red-600">*</span>Color
          Code</label>
        <Select v-model="applicationStatusColorCode" :options="severities" optionLabel="name"
          placeholder="Select a severity">
          <!-- Customize the dropdown items with PrimeVue's severity classes -->
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <Badge :severity="slotProps.value.value" style="margin-right: 8px;">
                {{ slotProps.value.name }}
              </Badge>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>

          <template #option="slotProps">
            <div class="flex items-center">
              <Badge :severity="slotProps.option.value" style="margin-right: 8px;">
                {{ slotProps.option.name }}
              </Badge>
            </div>
          </template>
        </Select>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnAddModal = false"></Button>
        <Button type="button" label="Save" @click="fetchAddApplicationStatus"></Button>
      </div>
    </Dialog>

    <!-- Dialog modal edit -->
    <Dialog v-model:visible="btnEditModal" modal header="Edit Application Status" :style="{ width: '25rem' }">
      <div class="flex flex-col gap-4 mb-4">
        <label for="editApplicationStatusName" class="font-semibold w-24">Name</label>
        <InputText id="editApplicationStatusName" v-model="viewApplicationStatusId.name" class="flex-auto"
          autocomplete="off" />

        <label for="editApplicationStatusColorCode" class="font-semibold w-24">Color Code</label>
        <Select v-model="viewApplicationStatusId.color_code" :options="severities" optionLabel="name" optionValue="value"
          placeholder="Select a severity">
          <!-- Customize the dropdown items with PrimeVue's severity classes -->
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center">
              <Badge :severity="slotProps.value" style="margin-right: 8px;">
                {{ slotProps.value }}
              </Badge>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>

          <template #option="slotProps">
            <div class="flex items-center">
              <Badge :severity="slotProps.option.value" style="margin-right: 8px;">
                {{ slotProps.option.name }}
              </Badge>
            </div>
          </template>
        </Select>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnEditModal = false"></Button>
        <Button type="button" label="Save" @click="fetchUpdateApplicationStatus"></Button>
      </div>
    </Dialog>
  </div>
</template>