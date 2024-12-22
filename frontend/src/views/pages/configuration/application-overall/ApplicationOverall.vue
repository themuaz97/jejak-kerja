<script setup>
import { activateApplicationOverall, addApplicationOverall, deleteApplicationOverall, getApplicationOverall, updateApplicationOverall } from "@/services/configuration.service";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from "vue";

const toast = useToast();
const confirm = useConfirm();

const applicationOveralls = ref([]);
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
const viewApplicationOverallId = ref({ id: null, name: "", color_code: "", is_active: false });

const applicationOverallName = ref('');
const applicationOverallColorCode = ref(null);

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
    message: "Are you sure you want to delete this application overall?",
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
        const { data } = await deleteApplicationOverall(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchApplicationOverall();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting application overall:", error);
      }
    },
  });
};

const confirmActivate = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to activate this application overall?",
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
        const { data } = await activateApplicationOverall(id);

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchApplicationOverall();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error activating application overall:", error);
      }
    },
  });
};

const fetchApplicationOverall = async () => {
  try {
    const { data } = await getApplicationOverall({ page: currentPage.value });

    applicationOveralls.value = data.resData.applyOverall;
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

const fetchAddApplicationOverall = async () => {
  try {
    const input = { name: applicationOverallName.value, colorCode: applicationOverallColorCode.value };
    const { data } = await addApplicationOverall(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      applicationOverallName.value = '';
      applicationOverallColorCode.value = null;
      btnAddModal.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
    fetchApplicationOverall();
  } catch (error) {
    console.error("Error adding application overall:", error.resData.message);
  }
};

const viewSelectedApplicationOverallId = (applicationOverallId) => {
  const applicationOverall = applicationOveralls.value.find((r) => r.id === applicationOverallId);
  if (applicationOverall) {
    viewApplicationOverallId.value = { ...applicationOverall };
    btnEditModal.value = true;
  }
};

const fetchUpdateApplicationOverall = async () => {
  try {

    const { data } = await updateApplicationOverall(viewApplicationOverallId.value.id, {
      name: viewApplicationOverallId.value.name,
      colorCode: viewApplicationOverallId.value.color_code,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh applicationOveralls and close modal
      await fetchApplicationOverall();
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
    console.error("Error updating application overall:", error.resData.message);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.resData.message,
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchApplicationOverall();
});
</script>

<template>
  <div class="card">
    <Toast />
    <ConfirmPopup />
    <div class="flex justify-end items-center mb-4">
      <Button label="Add Application Overall" icon="pi pi-plus" class="p-button-primary" @click="btnAddModal = true" />
    </div>
    <DataTable v-if="applicationOveralls.length > 0" :value="applicationOveralls" paginator :rows="rowsPerPage"
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
          <Button v-if="slotProps.data.is_active" @click="viewSelectedApplicationOverallId(slotProps.data.id)"
            icon="pi pi-pencil" class="p-button-sm p-button-primary mr-2" rounded />
          <Button v-if="slotProps.data.is_active" @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
            class="p-button-sm p-button-danger" rounded />
          <Button v-else @click="confirmActivate($event, slotProps.data.id)" icon="pi pi-undo"
            class="p-button-sm p-button-contrast" rounded />
        </template>
      </Column>
    </DataTable>

    <div v-else class="flex justify-center items-center">
      <p class="text-xl">No application overall found</p>
    </div>

    <!-- Dialog modal add -->
    <Dialog v-model:visible="btnAddModal" modal header="Add Application Overall" :style="{ width: '25rem' }">
      <div class="flex flex-col gap-4 m-4">
        <label for="applicationOverallName" class="font-semibold w-24"><span class="text-red-600">*</span>Name</label>
        <InputText id="applicationOverallName" v-model="applicationOverallName" class="flex-auto" autocomplete="off"
          placeholder="Application Overall Name" />

        <label for="applicationOverallColorCode" class="font-semibold w-24"><span class="text-red-600">*</span>Color
          Code</label>
        <Select v-model="applicationOverallColorCode" :options="severities" optionLabel="name"
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
        <Button type="button" label="Save" @click="fetchAddApplicationOverall"></Button>
      </div>
    </Dialog>

    <!-- Dialog modal edit -->
    <Dialog v-model:visible="btnEditModal" modal header="Edit Application Overall" :style="{ width: '25rem' }">
      <div class="flex flex-col gap-4 mb-4">
        <label for="editRoleName" class="font-semibold w-24">Name</label>
        <InputText id="editRoleName" v-model="viewApplicationOverallId.name" class="flex-auto" autocomplete="off" />

        <label for="editRoleColorCode" class="font-semibold w-24">Color Code</label>
        <Select v-model="viewApplicationOverallId.color_code" :options="severities" optionLabel="name" optionValue="value"
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
        <Button type="button" label="Save" @click="fetchUpdateApplicationOverall"></Button>
      </div>
    </Dialog>
  </div>
</template>