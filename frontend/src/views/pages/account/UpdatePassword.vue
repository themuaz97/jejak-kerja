<template>
  <div class="grid grid-cols-1 m-4 gap-4">
    <div class="flex flex-col gap-4 mb-2">
      <label for="currentPassword">Current Password</label>
      <Password id="currentPassword" type="text" placeholder="Current Password" fluid toggleMask />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="newPassword">New Password</label>
      <Password id="newPassword" type="text" placeholder="New Password" fluid toggleMask />
    </div>
    <div class="flex flex-col gap-4 mb-2">
      <label for="confirmNewPassword">Confirm New Password</label>
      <Password id="confirmNewPassword" type="email" placeholder="Confirm New Password" fluid toggleMask />
    </div>
    <div class="col-span-1 flex justify-end gap-4">
      <Button label="Save" />
    </div>
  </div>
</template>

<script setup>

</script>
