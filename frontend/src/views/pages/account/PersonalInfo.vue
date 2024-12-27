<script setup>
import Loading from '@/components/Loading.vue';
import { updateMe } from '@/services/account.service';
import { useUserStore } from '@/stores/user';
import { useToast } from 'primevue';
import { onMounted, ref, computed } from 'vue'

const meStore = useUserStore();

const toast = useToast();

const previewImageUrl = ref(null);
const profileImg = ref(null);

const originalUser = ref(null);
const loading = ref(false);

const uploadImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewImageUrl.value = URL.createObjectURL(file);
    profileImg.value = file;
  }
};

// Compare current user data with the original user data
const isChanged = computed(() => {
  if (!originalUser.value) return false;

  return (
    meStore.user.first_name !== originalUser.value.first_name ||
    meStore.user.last_name !== originalUser.value.last_name ||
    meStore.user.username !== originalUser.value.username ||
    meStore.user.phone_no !== originalUser.value.phone_no ||
    meStore.user.birth_at !== originalUser.value.birth_at ||
    !!profileImg.value // Check if a new profile image is selected
  );
});

const fetchUpdateMe = async () => {
  loading.value = true;
  try {
    const formData = new FormData();

    formData.append('firstName', meStore.user.first_name);
    formData.append('lastName', meStore.user.last_name);
    formData.append('username', meStore.user.username);
    formData.append('phoneNo', meStore.user.phone_no);
    formData.append('birthAt', meStore.user.birth_at);

    if (profileImg.value) {
      formData.append('profileImg', profileImg.value);
    }

    const { data } = await updateMe(formData);

    if (data.response.status === 200) {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: data.resData.message,
        life: 3000
      });
      await meStore.fetchMe();

      // Update the original user data to the latest data
      originalUser.value = { ...meStore.user };
    } else {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: data.resData.message,
        life: 3000
      });
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await meStore.fetchMe();
  // Set original user data after fetching
  originalUser.value = { ...meStore.user };
});
</script>

<template>
  <div v-if="meStore.user" class="grid grid-cols-2 m-4 gap-4">
    <div class="col-span-2 flex flex-col justify-center items-center gap-4 mb-4">
      <label
        class="absolute top-28 flex items-center justify-center w-36 h-36 bg-gray-200 rounded-full cursor-pointer overflow-hidden group">
        <input type="file" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*"
          @change="uploadImage" />
        <img id="profileImage" :src="previewImageUrl || meStore.user.profile_img" alt="profile"
          class="w-full h-full object-cover rounded-full" />
        <div
          class="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <i class="pi pi-pencil text-3xl"></i>
        </div>
      </label>
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="firstName">First Name</label>
      <InputText v-model="meStore.user.first_name" id="firstName" type="text" placeholder="First Name"
        variant="filled" />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="lastName">Last Name</label>
      <InputText v-model="meStore.user.last_name" id="lastName" type="text" placeholder="Last Name" variant="filled" />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="email">Email</label>
      <InputText v-model="meStore.user.email" id="email" type="email" placeholder="Email" disabled />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="username">Username</label>
      <InputText v-model="meStore.user.username" id="username" type="text" placeholder="Username" variant="filled" />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="phoneNo">Phone Number</label>
      <InputText v-model="meStore.user.phone_no" id="phoneNo" v-tooltip="'Format: +601123456789'" type="text"
        placeholder="Phone Number" variant="filled" />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="birthAt">Date of Birth</label>
      <Datepicker v-model="meStore.user.birth_at" id="birthAt" type="text" placeholder="Date of Birth" showIcon
        iconDisplay="input" dateFormat="dd/mm/yy" variant="filled" />
    </div>
    <div></div>
    <div class="col-span-1 flex justify-end gap-4">
      <Button label="Save" @click="fetchUpdateMe" :loading="loading" :disabled="!isChanged" />
    </div>
  </div>
  <div v-else>
    <Loading />
  </div>
</template>