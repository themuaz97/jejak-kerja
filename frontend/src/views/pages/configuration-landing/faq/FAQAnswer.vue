<script setup>
import { activateFaqAnswer, addFaqAnswer, deleteFaqAnswer, getFaqAnswersAdmin, updateFaqAnswer } from "@/services/faq.service";
import { useFaqQuestionStore } from "@/stores/faq";
import { useConfirm } from "primevue";
import { useToast } from "primevue/usetoast";
import { ref, onMounted, computed } from "vue";

const faqQuestionStore = useFaqQuestionStore();

const toast = useToast();
const confirm = useConfirm();

const faqQuestions = computed(() => faqQuestionStore.faqQuestion);
const faqAnswers = ref([]);

const loading = ref(false);

const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalRecords = ref(0);
const totalPages = ref(0);

const btnAddModal = ref(false);

const btnEditModal = ref(false);
const viewFaqAnswerId = ref({ id: null, answer: "", faq_question_id: null });

const answer = ref('');
const faqQuestionId = ref('');

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
    message: "Are you sure you want to delete this answer?",
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
        const { data } = await deleteFaqAnswer(id)

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchFaqAnswers();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error deleting answer:", error.message);
      }
    },
  });
};

const confirmActivate = (event, id) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to activate this answer?",
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
        const { data } = await activateFaqAnswer(id);

        if (data.response.status === 200) {
          toast.add({
            severity: "success",
            summary: "Success",
            detail: data.resData.message,
            life: 3000,
          });
          fetchFaqAnswers();
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: data.resData.message,
            life: 3000,
          });
        }
      } catch (error) {
        console.error("Error activating answer:", error.message);
      }
    },
  });
};

const fetchFaqAnswers = async () => {
  loading.value = true;
  try {
    const { data } = await getFaqAnswersAdmin({ page: currentPage.value });

    faqAnswers.value = data.resData.data;
    totalRecords.value = data.resData.meta.totalCount;
    totalPages.value = data.resData.meta.totalPages;
    currentPage.value = data.resData.meta.page;
  } catch (error) {
    console.error("Error fetching application Statuses:", error.message);
  } finally {
    loading.value = false;
  }
};

const fetchAddFaqAnswer = async () => {
  try {
    const input = { answer: answer.value, faqQuestionId: faqQuestionId.value };
    const { data } = await addFaqAnswer(input);

    if (data.response.status === 201) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });
      answer.value = '';
      faqQuestionId.value = '';
      btnAddModal.value = false;
    } else {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: data.resData.message,
        life: 3000,
      })
    }
    fetchFaqAnswers();
  } catch (error) {
    console.error("Error adding answer:", error.message);
  }
};

const viewSelectedFaqAnswerId = (answerId) => {
  const answer = faqAnswers.value.find((r) => r.id === answerId);
  if (answer) {
    viewFaqAnswerId.value = { ...answer };
    faqQuestionId.value = answer.faq_question_id;
    btnEditModal.value = true;
  }
};

const fetchUpdateFaqAnswer = async () => {
  try {

    const { data } = await updateFaqAnswer(viewFaqAnswerId.value.id, {
      answer: viewFaqAnswerId.value.answer,
      faqQuestionId: viewFaqAnswerId.value.faq_question_id,
    });

    if (data.response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: data.resData.message,
        life: 3000,
      });

      // Refresh faqAnswers and close modal
      await fetchFaqAnswers();
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
    console.error("Error updating answer:", error.message);
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: 3000,
    });
  }
};

onMounted(async () => {
  await fetchFaqAnswers();
  await faqQuestionStore.fetchFaqQuestions();
});
</script>

<template>
  <DataTable :value="faqAnswers" paginator :rows="rowsPerPage" :totalRecords="totalRecords"
    :first="(currentPage - 1) * rowsPerPage"
    paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" :currentPage="currentPage - 1" stripedRows
    tableStyle="min-width: 50rem">
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="text-xl font-bold">FAQ Answers</span>
        <Button label="Add Answer" icon="pi pi-plus" class="p-button-primary" @click="btnAddModal = true" />
      </div>
    </template>
    <Column header="#" style="width: 4%">
      <template #body="slotProps">
        {{ slotProps.index + 1 + (currentPage - 1) * rowsPerPage }}
      </template>
    </Column>
    <template #empty> No answer found. </template>
    <template #loading> Loading answer data. Please wait. </template>
    <Column field="answer" header="Answers" style="width: 40%"></Column>
    <Column field="faq_questions.question" header="Questions" style="width: 40%"></Column>
    <Column field="is_active" header="Status">
      <template #body="slotProps">
        <Tag :severity="getSeverity(slotProps.data.is_active)"
          :value="slotProps.data.is_active ? 'Active' : 'Inactive'" />
      </template>
    </Column>
    <Column header="Action" style="width: 10%;">
      <template #body="slotProps">
        <Button v-if="slotProps.data.is_active" @click="viewSelectedFaqAnswerId(slotProps.data.id)" icon="pi pi-pencil"
          class="p-button-sm p-button-primary mr-2" rounded />
        <Button v-if="slotProps.data.is_active" @click="confirmDelete($event, slotProps.data.id)" icon="pi pi-trash"
          class="p-button-sm p-button-danger" rounded />
        <Button v-else @click="confirmActivate($event, slotProps.data.id)" icon="pi pi-undo"
          class="p-button-sm p-button-contrast" rounded />
      </template>
    </Column>
  </DataTable>

  <!-- Dialog modal add -->
  <Dialog v-model:visible="btnAddModal" modal header="Add Answer" :style="{ width: '35rem' }">
    <div class="flex flex-col gap-4 m-4">
      <label for="answer" class="font-semibold w-24"><span class="text-red-600">*</span> Name</label>
      <TextArea v-model="answer" class="flex-auto" autocomplete="off" placeholder="Answer" autoResize />

      <label for="faqQuestionId" class="font-semibold"><span class="text-red-600">*</span> FAQ Questions</label>
      <Select v-model="faqQuestionId" :options="faqQuestions" optionLabel="question" optionValue="id"
        placeholder="Select question" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="btnAddModal = false"></Button>
      <Button type="button" label="Save" @click="fetchAddFaqAnswer"></Button>
    </div>
  </Dialog>

  <!-- Dialog modal edit -->
  <Dialog v-model:visible="btnEditModal" modal header="Edit Answer" :style="{ width: '35rem' }">
    <div class="flex flex-col gap-4 mb-4">
      <label for="editAnswer" class="font-semibold w-24"><span class="text-red-600">*</span> Answer</label>
      <TextArea v-model="viewFaqAnswerId.answer" class="flex-auto" autocomplete="off" variant="filled" autoResize />

      <label for="editQuestionId" class="font-semibold"><span class="text-red-600">*</span>
        FAQ Questions</label>
      <Select v-model="viewFaqAnswerId.faq_question_id" :options="faqQuestions" optionLabel="question" optionValue="id"
        placeholder="Select question" variant="filled" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="btnEditModal = false"></Button>
      <Button type="button" label="Save" @click="fetchUpdateFaqAnswer"></Button>
    </div>
  </Dialog>
</template>