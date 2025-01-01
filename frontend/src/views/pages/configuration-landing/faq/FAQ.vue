<script setup>
import { activateApplicationStatus, addApplicationStatus, deleteApplicationStatus, getApplicationStatus, updateApplicationStatus } from "@/services/configuration.service";
import { ref, onMounted } from "vue";
import FAQCategory from "./FAQCategory.vue";
import FAQQuestion from "./FAQQuestion.vue";
import FAQAnswer from "./FAQAnswer.vue";

onMounted(() => {

});
</script>

<template>
  <div class="card">
    <Toast />
    <ConfirmPopup />
    <div class="flex flex-col gap-20">
      <FAQCategory />
  
      <Divider />
  
      <DeferredContent>
      <FAQQuestion />
      </DeferredContent>

      <Divider />
  
      <DeferredContent>
      <FAQAnswer />
      </DeferredContent>
    </div>
  </div>
</template>