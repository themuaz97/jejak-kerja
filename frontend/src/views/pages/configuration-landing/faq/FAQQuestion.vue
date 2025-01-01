<script setup>
import { activateFaqQuestion, addFaqQuestion, deleteFaqQuestion, getFaqQuestionsAdmin, updateFaqQuestion } from "@/services/faq.service";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted } from "vue";

const toast = useToast();
const confirm = useConfirm();

const faqQuestions = ref([]);
const faqAnswers = ref({});

const loading = ref(false);

const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalRecords = ref(0);
const totalPages = ref(0);

const btnAddModal = ref(false);

const btnEditModal = ref(false);
const viewFaqQuestionId = ref({ id: null, question: '', faq_category_id: null });

const question = ref('');
const faqCategoryId = ref(null);

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
    message: "Are you sure you want to delete this question?",
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
        const { data } = await deleteFaqQuestion(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchFaqQuestions();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting question:", error);
      }
    },
  });
};

const confirmActivate = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to activate this question?",
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
        const { data } = await activateFaqQuestion(id);

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchFaqQuestions();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error activating question:", error);
      }
    },
  });
};

const fetchFaqQuestions = async () => {
  loading.value = true;
  try {
    const { data } = await getFaqQuestionsAdmin({ page: currentPage.value });

    faqQuestions.value = data.resData.data;
    faqAnswers.value = data.resData.data.faq_answers;
    totalRecords.value = data.resData.meta.totalCount;
    totalPages.value = data.resData.meta.totalPages;
    currentPage.value = data.resData.meta.page;
  } catch (error) {
    console.error("Error fetching application Statuses:", error);
  } finally {
    loading.value = false;
  }
};

const fetchAddFaqQuestion = async () => {
  try {
    const input = { question: question.value, faqCategoryId: faqCategoryId.value };
    const { data } = await addFaqQuestion(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      question.value = '';
      faqCategoryId.value = '';

      btnAddModal.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
    fetchFaqQuestions();
  } catch (error) {
    console.error("Error adding question:", error.resData.message);
  }
};

const viewSelectedFaqQuestionId = (questionId) => {
  const question = faqQuestions.value.find((r) => r.id === questionId);
  if (question) {
    viewFaqQuestionId.value = { ...question };
    btnEditModal.value = true;
  }
};

const fetchUpdateQuestion = async () => {
  try {

    const { data } = await updateFaqQuestion(viewFaqQuestionId.value.id, {
      question: viewFaqQuestionId.value.question,
      faqCategoryId: faqCategoryId.value.faq_category_id,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh faqQuestions and close modal
      await fetchFaqQuestions();
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
    console.error("Error updating question:", error.resData.message);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.resData.message,
      life: 3000,
    });
  }
};

onMounted(() => {
  fetchFaqQuestions();
});
</script>

<template>
  <DataTable v-model:expanded-rows="faqAnswers" :value="faqQuestions" paginator :rows="rowsPerPage"
    :totalRecords="totalRecords" :first="(currentPage - 1) * rowsPerPage"
    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :currentPage="currentPage - 1" stripedRows
    tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">FAQ Questions</span>
        <Button label="Add Question" icon="pi pi-plus" class="p-button-primary" @click="btnAddModal = true" />
      </div>
    </template>
    <Column expander style="width: 5%" />
    <Column header="#" style="width: 10%">
      <template #body="slotProps">
        {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
      </template>
    </Column>
    <template #empty> No question found. </template>
    <template #loading> Loading question data. Please wait. </template>
    <Column field="question" header="Name"></Column>
    <Column field="faq_categories.category_name" header="Category"></Column>
    <Column field="is_active" header="Status">
      <template #body="slotProps">
        <Tag :severity="getSeverity(slotProps.data.is_active)"
          :value="slotProps.data.is_active ? 'Active' : 'Inactive'" />
      </template>
    </Column>
    <Column header="Action" style="width: 10%;">
      <template #body="slotProps">
        <Button v-if="slotProps.data.is_active" @click="viewSelectedFaqQuestionId(slotProps.data.id)"
          icon="pi pi-pencil" class="p-button-sm p-button-primary mr-2" rounded />
        <Button v-if="slotProps.data.is_active" @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
          class="p-button-sm p-button-danger" rounded />
        <Button v-else @click="confirmActivate($event, slotProps.data.id)" icon="pi pi-undo"
          class="p-button-sm p-button-contrast" rounded />
      </template>
    </Column>
    <template #expansion="slotProps">
      <div class="p-4">
        <DataTable :value="slotProps.data.faq_answers">
          <Column header="#">
            <template #body="slotProps">
              {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
            </template>
          </Column>
          <Column field="answer" header="Answers"></Column>
          <Column field="is_active" header="Status">
            <template #body="slotProps">
              <Tag :severity="getSeverity(slotProps.data.is_active)"
                :value="slotProps.data.is_active ? 'Active' : 'Inactive'" />
            </template>
          </Column>
          <template #empty> No Answer found. </template>
        </DataTable>
      </div>
    </template>
  </DataTable>

  <!-- Dialog modal add -->
  <Dialog v-model:visible="btnAddModal" modal header="Add Question" :style="{ width: '25rem' }">
    <div class="flex flex-col gap-4 m-4">
      <label for="question" class="font-semibold w-24"><span class="text-red-600">*</span>Name</label>
      <InputText id="question" v-model="question" class="flex-auto" autocomplete="off"
        placeholder="Question Name" />

      <label for="faqCategories" class="font-semibold w-24"><span class="text-red-600">*</span>Color
        Code</label>
      <Select v-model="faqCategories" :options="severities" optionLabel="name"
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
      <Button type="button" label="Save" @click="fetchAddFaqQuestion"></Button>
    </div>
  </Dialog>

  <!-- Dialog modal edit -->
  <Dialog v-model:visible="btnEditModal" modal header="Edit Question" :style="{ width: '25rem' }">
    <div class="flex flex-col gap-4 mb-4">
      <label for="editApplicationStatusName" class="font-semibold w-24">Name</label>
      <InputText id="editApplicationStatusName" v-model="viewFaqQuestionId.name" class="flex-auto" autocomplete="off" />

      <label for="editApplicationStatusColorCode" class="font-semibold w-24">Color Code</label>
      <Select v-model="viewFaqQuestionId.color_code" :options="severities" optionLabel="name" optionValue="value"
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
      <Button type="button" label="Save" @click="fetchUpdateQuestion"></Button>
    </div>
  </Dialog>
</template>