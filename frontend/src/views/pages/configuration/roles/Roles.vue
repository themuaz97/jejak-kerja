<script setup>
import { addRole, deleteRole, getRoles, updateRole } from "@/services/configuration.service";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from "vue";

const toast = useToast();
const confirm = useConfirm();

const roles = ref([]);

const loading = ref(false);

const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalRecords = ref(0);
const totalPages = ref(0);

const btnAddModal = ref(false);

const btnEditModal = ref(false);
const viewRoleId = ref({ id: null, name: "" });

const roleName = ref('');

const confirmDelete = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to delete this role?",
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
        const { data } = await deleteRole(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchRoles();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting role:", error);
      }
    },
  });
};

const fetchRoles = async () => {
  loading.value = true;
  try {
    const { data } = await getRoles({ page: currentPage.value });

    roles.value = data.resData.roles;
    totalRecords.value = data.resData.meta.totalCount;
    totalPages.value = data.resData.meta.totalPages;
    currentPage.value = data.resData.meta.page;
  } catch (error) {
    console.error("Error fetching roles:", error);
  } finally {
    loading.value = false;
  }
};

const fetchAddRole = async () => {
  try {
    const input = { name: roleName.value };
    const { data } = await addRole(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      roleName.value = '';
      btnAddModal.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
    fetchRoles();
  } catch (error) {
    console.error("Error adding role:", error);
  }
};

const viewSelectedRoleId = (roleId) => {
  const role = roles.value.find((r) => r.id === roleId);
  if (role) {
    viewRoleId.value = { ...role };
    btnEditModal.value = true; 
  }
};

const fetchUpdateRole = async () => {
  try {

    const { data } = await updateRole(viewRoleId.value.id, {
      name: viewRoleId.value.name,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh roles and close modal
      await fetchRoles();
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
    console.error("Error updating role:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "An error occurred while updating the role.",
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchRoles();
});
</script>

<template>
  <div class="card">
    <Toast />
    <ConfirmPopup />
    <div class="flex justify-end items-center mb-4">
      <Button label="Add Role" icon="pi pi-plus" class="p-button-primary" @click="btnAddModal = true" />
    </div>
    <DataTable :value="roles" paginator :rows="rowsPerPage" :totalRecords="totalRecords"
      :first="(currentPage - 1) * rowsPerPage"
      paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :currentPage="currentPage - 1" stripedRows
      tableStyle="min-width: 50rem">
      <Column header="#" style="width: 10%">
        <template #body="slotProps">
          {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
        </template>
      </Column>
      <template #empty> No roles found. </template>
      <template #loading> Loading roles data. Please wait. </template>
      <Column field="name" header="Name" style="width: 60%"></Column>
      <Column header="Action" style="width: 10%;">
        <template #body="slotProps">
          <Button @click="viewSelectedRoleId(slotProps.data.id)" icon="pi pi-pencil"
            class="p-button-sm p-button-primary mr-2" rounded />
          <Button @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
            class="p-button-sm p-button-danger" rounded />
        </template>
      </Column>
    </DataTable>

    <!-- Dialog modal add -->
    <Dialog v-model:visible="btnAddModal" modal header="Add Role" :style="{ width: '25rem' }">
      <div class="flex items-center gap-4 mb-4">
        <label for="roleName" class="font-semibold w-24"><span class="text-red-600">*</span>Role Name</label>
        <InputText id="roleName" v-model="roleName" class="flex-auto" autocomplete="off" placeholder="Role Name" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnAddModal = false"></Button>
        <Button type="button" label="Save" @click="fetchAddRole"></Button>
      </div>
    </Dialog>

    <!-- Dialog modal edit -->
    <Dialog v-model:visible="btnEditModal" modal header="Edit Role" :style="{ width: '25rem' }">
      <div class="flex items-center gap-4 mb-4">
        <label for="editRoleName" class="font-semibold w-24">Role Name</label>
        <InputText id="editRoleName" v-model="viewRoleId.name" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnEditModal = false"></Button>
        <Button type="button" label="Save" @click="fetchUpdateRole"></Button>
      </div>
    </Dialog>
  </div>
</template>