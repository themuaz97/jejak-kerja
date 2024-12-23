<script setup>
import Roles from './roles/Roles.vue';
import Users from './users/Users.vue';
import ApplicationStatus from './application-status/ApplicationStatus.vue';
import ApplicationOverall from './application-overall/ApplicationOverall.vue';
// import Notification from './notification/Notification.vue';
</script>

<!-- TODO: prevent all tabs fetched at once -->
<template>
  <div class="card">
      <Tabs class="rounded-2xl" value="0">
            <TabList>
                <Tab value="0">Roles</Tab>
                <Tab value="1">Users</Tab>
                <Tab value="2">Application Status</Tab>
                <Tab value="3">Application Overall</Tab>
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
            </TabPanels>
        </Tabs>
  </div>
</template>