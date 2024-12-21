<script setup>
import { activateUser, addUser, deleteUser, getRoles, getUsers, updateUser } from "@/services/configuration.service";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from "vue";

const toast = useToast();
const confirm = useConfirm();

const users = ref([]);
const roles = ref([]);

const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalRecords = ref(0);
const totalPages = ref(0);

const btnAddModal = ref(false);

const btnEditModal = ref(false);
const viewUserId = ref({ id: null, first_name: "", last_name: "", email: "", username: "", password: "", role_id: "", is_active: true });

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const roleId = ref(null);

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
    message: "Are you sure you want to delete this user?",
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
        const { data } = await deleteUser(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchUsers();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  });
};

const confirmActivate = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to activate this user?",
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
        const { data } = await activateUser(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchUsers();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error activating user:", error);
      }
    }
  })
}

const fetchUsers = async () => {
  try {
    const { data } = await getUsers({ page: currentPage.value });

    users.value = data.resData.users;
    totalRecords.value = data.resData.meta.totalCount;
    totalPages.value = data.resData.meta.totalPages;
    currentPage.value = data.resData.meta.page;
  } catch (error) {
    console.error("Error fetching users:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load users",
      life: 3000,
    });
  }
};

const fetchAddUser = async () => {
  try {
    const input = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      roleId: roleId.value,
    };

    const { data } = await addUser(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      username.value = '';
      password.value = '';
      confirmPassword.value = '';
      roleId.value = '';

      btnAddModal.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
    fetchUsers();
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

const viewSelectedUserId = (userId) => {
  const user = users.value.find((r) => r.id === userId);
  if (user) {
    viewUserId.value = { ...user };
    btnEditModal.value = true;
  }
};

const fetchUpdateUser = async () => {
  try {
    const { data } = await updateUser(viewUserId.value.id, {
      firstName: viewUserId.value.first_name,
      lastName: viewUserId.value.last_name,
      email: viewUserId.value.email,
      username: viewUserId.value.username,
      password: viewUserId.value.password,
      roleId: viewUserId.value.role_id,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh users and close modal
      await fetchUsers();
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
    console.error("Error updating user:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "An error occurred while updating the user.",
      life: 3000,
    });
  }
};

const fetchRoles = async () => {
  try {
    const { data } = await getRoles({ page: currentPage.value });

    roles.value = data.resData.roles;
  } catch (error) {
    console.error("Error fetching roles:", error);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to load roles",
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchUsers();
  fetchRoles();
});
</script>

<template>
  <div class="card">
    <Toast />
    <ConfirmPopup />
    <div class="flex justify-end items-center mb-4">
      <Button label="Add User" icon="pi pi-plus" class="p-button-primary" @click="btnAddModal = true" />
    </div>
    <DataTable v-if="users.length > 0" :value="users" paginator :rows="rowsPerPage" :totalRecords="totalRecords"
      :first="(currentPage - 1) * rowsPerPage"
      paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :currentPage="currentPage - 1" stripedRows
      tableStyle="min-width: 50rem">
      <Column header="#" style="width: 10%">
        <template #body="slotProps">
          {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
        </template>
      </Column>
      <Column field="email" header="Email"></Column>
      <Column field="username" header="Username"></Column>
      <Column field="roles.name" header="Roles"></Column>
      <Column field="is_active" header="Status">
        <template #body="slotProps">
          <Tag :severity="getSeverity(slotProps.data.is_active)" :value="slotProps.data.is_active ? 'Active' : 'Inactive'" />
        </template>
      </Column>
      <Column header="Action" style="width: 10%;">
        <template #body="slotProps">
          <Button v-if="slotProps.data.is_active" @click="viewSelectedUserId(slotProps.data.id)" icon="pi pi-pencil"
            class="p-button-sm p-button-primary mr-2" v-tooltip="'edit'" rounded />
          <Button v-if="slotProps.data.is_active" @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
            class="p-button-sm p-button-danger" v-tooltip="'delete'" rounded />
          <Button v-else @click="confirmActivate($event, slotProps.data.id)" icon="pi pi-undo"
            class="p-button-sm p-button-contrast" v-tooltip="'re-activate'" rounded />
        </template>
      </Column>
    </DataTable>

    <div v-else class="flex justify-center items-center">
      <p class="text-xl">No users found</p>
    </div>

    <!-- Dialog modal add -->
    <Dialog v-model:visible="btnAddModal" modal header="Add User" :style="{ width: '35rem' }">
      <div class="flex flex-col gap-4 m-4">
        <label for="firstName" class="font-semibold w-24"><span class="text-red-600">*</span>First Name</label>
        <InputText id="firstName" v-model="firstName" class="flex-auto" autocomplete="off" placeholder="First Name" />

        <label for="lastName" class="font-semibold w-24"><span class="text-red-600">*</span>Last Name</label>
        <InputText id="lastName" v-model="lastName" class="flex-auto" autocomplete="off" placeholder="Last Name" />

        <label for="email" class="font-semibold w-24"><span class="text-red-600">*</span>Email</label>
        <InputText id="email" v-model="email" class="flex-auto" autocomplete="off" placeholder="Email" />

        <label for="username" class="font-semibold w-24">Username</label>
        <InputText id="username" v-model="username" class="flex-auto" autocomplete="off"
          placeholder="Username(Optional)" />

        <label for="password" class="font-semibold w-24"><span class="text-red-600">*</span>Password</label>
        <Password id="password" promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity"
          strongLabel="Strong" v-model="password" class="flex-auto" autocomplete="off" fluid toggleMask
          placeholder="Password" />

        <label for="confirmPassword" class="font-semibold"><span class="text-red-600">*</span>Confirm Password</label>
        <Password id="confirmPassword" promptLabel="Choose a password" weakLabel="Too simple"
          mediumLabel="Average complexity" strongLabel="Strong" v-model="confirmPassword" class="flex-auto"
          autocomplete="off" fluid toggleMask placeholder="Confirm Password" />

        <label for="roleId" class="font-semibold"><span class="text-red-600">*</span>Role</label>
        <div class="flex items-center gap-2">
          <div v-for="role in roles" :key="role.id" class="flex items-center gap-2">
            <RadioButton v-model="roleId" :inputId="`role-${role.id}`" name="role" :value="role.id" />
            <label :for="`role-${role.id}`">{{ role.name }}</label>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnAddModal = false"></Button>
        <Button type="button" label="Save" @click="fetchAddUser"></Button>
      </div>
    </Dialog>

    <!-- Dialog modal edit -->
    <Dialog v-model:visible="btnEditModal" modal header="Edit User" :style="{ width: '35rem' }">
      <div class="flex flex-col gap-4 m-4">
        <label for="firstName" class="font-semibold w-24"><span class="text-red-600">*</span>First Name</label>
        <InputText id="firstName" v-model="viewUserId.first_name" class="flex-auto" autocomplete="off"
          placeholder="First Name" />

        <label for="lastName" class="font-semibold w-24"><span class="text-red-600">*</span>Last Name</label>
        <InputText id="lastName" v-model="viewUserId.last_name" class="flex-auto" autocomplete="off"
          placeholder="Last Name" />

        <label for="email" class="font-semibold w-24"><span class="text-red-600">*</span>Email</label>
        <InputText id="email" v-model="viewUserId.email" class="flex-auto" autocomplete="off" placeholder="Email" />

        <label for="username" class="font-semibold w-24">Username</label>
        <InputText id="username" v-model="viewUserId.username" class="flex-auto" autocomplete="off"
          placeholder="Username(Optional)" />

        <label for="password" class="font-semibold w-24"><span class="text-red-600">*</span>Password</label>
        <Password id="password" promptLabel="Choose a password" weakLabel="Too simple" mediumLabel="Average complexity"
          strongLabel="Strong" v-model="viewUserId.password" class="flex-auto" autocomplete="off" fluid toggleMask
          placeholder="Password" />

        <label for="confirmPassword" class="font-semibold"><span class="text-red-600">*</span>Confirm Password</label>
        <Password id="confirmPassword" promptLabel="Choose a password" weakLabel="Too simple"
          mediumLabel="Average complexity" strongLabel="Strong" v-model="confirmPassword" class="flex-auto"
          autocomplete="off" fluid toggleMask placeholder="Confirm Password" />

        <label for="roleId" class="font-semibold"><span class="text-red-600">*</span>Role</label>
        <div class="flex items-center gap-2">
          <div v-for="role in roles" :key="role.id" class="flex items-center gap-2">
            <RadioButton v-model="viewUserId.role_id" :inputId="`role-${role.id}`" name="role" :value="role.id" />
            <label :for="`role-${role.id}`">{{ role.name }}</label>
          </div>
        </div>
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnEditModal = false"></Button>
        <Button type="button" label="Save" @click="fetchUpdateUser"></Button>
      </div>
    </Dialog>
  </div>
</template>