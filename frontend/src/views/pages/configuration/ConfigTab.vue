<script setup>
import Roles from './roles/Roles.vue';
// import Users from './users/Users.vue';
// import Notification from './notification/Notification.vue';
</script>

<template>
  <div class="card">
      <Tabs class="rounded-2xl" value="0">
            <TabList>
                <Tab value="0">Roles</Tab>
                <Tab value="1">Users</Tab>
                <Tab value="2">Application Status</Tab>
                <Tab value="3">Application Overall</Tab>
                <!-- <Tab value="4">Notifications</Tab> -->
            </TabList>
            <TabPanels>
                <TabPanel value="0">
                    <Roles />
                </TabPanel>
                <TabPanel value="1">
                    <Users />
                </TabPanel>
                <TabPanel value="2">
                    <ApplicationStatus />
                </TabPanel>
                <TabPanel value="3">
                    <ApplicationOverall />
                </TabPanel>
                <TabPanel value="4">
                    <p class="m-0">
                      <Notification />
                    </p>
                </TabPanel>
            </TabPanels>
        </Tabs>
  </div>
</template>