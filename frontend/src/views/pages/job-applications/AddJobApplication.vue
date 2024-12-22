<template>
  <div class="card">
    <Card>
      <template #title>
        Add Job Application
      </template>
      <template #content>
        <div class="grid grid-cols-2 gap-8 md:grid-cols-2 sm:grid-cols-1">
          <div class="col-span-1 flex flex-col gap-4">
            <label for="Position">Position</label>
            <InputText id="Position" type="text" />
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <label for="position_level">Position Level</label>
            <InputText id="position_level" type="text" />
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <label for="Company">Company</label>
            <InputText id="Company" type="text" />
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <label for="platform">Platform</label>
            <InputText id="platform" type="text" />
          </div>
          <div class="col-span-2 flex flex-col gap-4">
            <label for="location">Location</label>
            <InputText id="location" type="text" />
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <label for="expected_salary">Expected Salary</label>
            <InputText id="expected_salary" type="text" />
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <label for="offered_salary">Offered Salary</label>
            <InputText id="offered_salary" type="text" />
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <label for="job_status">Job Status</label>
            <InputText id="job_status" type="text" />
          </div>
          <div class="col-span-1 flex flex-col gap-4">
            <label for="reviews">Company Reviews</label>
            <InputText id="reviews" type="text" />
          </div>
          <div class="col-span-2 flex flex-col gap-4">
            <label for="remarks">Remarks</label>
            <InputText id="remarks" type="text" />
          </div>
          <div class="col-span-1"></div>
          <div class="col-span-1 gap-4 flex justify-end">
            <Button @click="$router.push('/jobs')" class="mt-4" label="Cancel" severity="secondary" />
            <Button class="mt-4" label="Save" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup>

</script>

<style scoped>
/* Add your styles here */
</style>