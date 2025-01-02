<script setup>
import { activateFaqCategory, addFaqCategory, deleteFaqCategory, updateFaqCategory } from "@/services/faq.service";
import { useFaqCategoryStore } from "@/stores/faq";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted, computed } from "vue";

const faqCategoryStore = useFaqCategoryStore(); 

const toast = useToast();
const confirm = useConfirm();

const faqCategories = computed(() => faqCategoryStore.faqCategory);
const currentPage = computed(() => faqCategoryStore.currentPage);
const rowsPerPage = ref(5);
const totalRecords = computed(() => faqCategoryStore.totalRecords);
const totalPages = computed(() => faqCategoryStore.totalPages);

const btnAddModal = ref(false);

const btnEditModal = ref(false);
const viewFaqCategoryId = ref({ id: null, category_name: ''});

const categoryName = ref('');

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
    message: "Are you sure you want to delete this category?",
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
        const { data } = await deleteFaqCategory(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          await faqCategoryStore.fetchFaqCategories(true);
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },
  });
};

const confirmActivate = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to activate this category?",
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
        const { data } = await activateFaqCategory(id);

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          await faqCategoryStore.fetchFaqCategories(true);
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error activating category:", error);
      }
    },
  });
};

const fetchAddFaqCategory = async () => {
  try {
    const input = { categoryName: categoryName.value };
    const { data } = await addFaqCategory(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      categoryName.value = '';
      btnAddModal.value = false;
      faqCategoryStore.fetchFaqCategories(true);
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
  } catch (error) {
    console.error("Error adding category:", error.resData.message);
  }
};

const viewSelectedFaqCategoryId = (faqCategoryId) => {
  const faqCategory = faqCategories.value.find((r) => r.id === faqCategoryId);
  if (faqCategory) {
    viewFaqCategoryId.value = { ...faqCategory };
    btnEditModal.value = true;
  }
};

const fetchUpdateFaqCategory = async () => {
  try {
    const { data } = await updateFaqCategory(viewFaqCategoryId.value.id, {
      categoryName: viewFaqCategoryId.value.category_name,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh faqCategories and close modal
      await faqCategoryStore.fetchFaqCategories(true);
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
    console.error("Error updating category:", error.resData.message);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.resData.message,
      life: 3000,
    });
  }
};

onMounted(async() => {
  await faqCategoryStore.fetchFaqCategories();
});
</script>

<template>
    <DataTable :value="faqCategories" paginator :rows="rowsPerPage" :totalRecords="totalRecords"
      :first="(currentPage - 1) * rowsPerPage"
      paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :currentPage="currentPage - 1" stripedRows
      tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <span class="text-xl font-bold">FAQ Categories</span>
          <Button label="Add Category" icon="pi pi-plus" class="p-button-primary"
            @click="btnAddModal = true" />
        </div>
      </template>
      <Column header="#" style="width: 4%">
        <template #body="slotProps">
          {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
        </template>
      </Column>
      <template #empty> No category found. </template>
      <template #loading> Loading category data. Please wait. </template>
      <Column field="category_name" header="Name"></Column>
      <Column field="is_active" header="Status">
        <template #body="slotProps">
          <Tag :severity="getSeverity(slotProps.data.is_active)"
            :value="slotProps.data.is_active ? 'Active' : 'Inactive'" />
        </template>
      </Column>
      <Column header="Action" style="width: 10%;">
        <template #body="slotProps">
          <Button v-if="slotProps.data.is_active" @click="viewSelectedFaqCategoryId(slotProps.data.id)"
            icon="pi pi-pencil" class="p-button-sm p-button-primary mr-2" rounded />
          <Button v-if="slotProps.data.is_active" @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
            class="p-button-sm p-button-danger" rounded />
          <Button v-else @click="confirmActivate($event, slotProps.data.id)" icon="pi pi-undo"
            class="p-button-sm p-button-contrast" rounded />
        </template>
      </Column>
    </DataTable>

    <!-- Dialog modal add -->
    <Dialog v-model:visible="btnAddModal" modal header="Add Category" :style="{ width: '35rem' }">
      <div class="flex flex-col gap-4 m-4">
        <label for="categoryName" class="font-semibold w-24"><span class="text-red-600">*</span>Name</label>
        <InputText id="categoryName" v-model="categoryName" class="flex-auto" autocomplete="off"
          placeholder="Category Name" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnAddModal = false"></Button>
        <Button type="button" label="Save" @click="fetchAddFaqCategory"></Button>
      </div>
    </Dialog>

    <!-- Dialog modal edit -->
    <Dialog v-model:visible="btnEditModal" modal header="Edit Category" :style="{ width: '35rem' }">
      <div class="flex flex-col gap-4 mb-4">
        <label for="editCategoryName" class="font-semibold w-24">Name</label>
        <InputText id="editCategoryName" v-model="viewFaqCategoryId.category_name" class="flex-auto"
          autocomplete="off" variant="filled" />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancel" severity="secondary" @click="btnEditModal = false"></Button>
        <Button type="button" label="Save" @click="fetchUpdateFaqCategory"></Button>
      </div>
    </Dialog>
</template>