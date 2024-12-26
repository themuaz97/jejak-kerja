<script setup>
import { markRaw, ref } from 'vue';
import Roles from './roles/Roles.vue';
import Users from './users/Users.vue';
import ApplicationStatus from './application-status/ApplicationStatus.vue';
import ApplicationOverall from './application-overall/ApplicationOverall.vue';

const tabs = ref([
    { title: 'Roles', value: '0', component: markRaw(Roles) },
    { title: 'Users', value: '1', component: markRaw(Users) },
    { title: 'Application Status', value: '2', component: markRaw(ApplicationStatus) },
    { title: 'Application Overall', value: '3', component: markRaw(ApplicationOverall) },
]);

const activeTab = ref('0');

// Track which components have been rendered
const renderedComponents = ref(new Set(['0'])); 

const handleTabChange = (newValue) => {
    activeTab.value = newValue;
    renderedComponents.value.add(newValue);
};
</script>

<template>
    <div class="card">
        <Tabs class="rounded-2xl" v-model:value="activeTab" @update:value="handleTabChange">
            <!-- Dynamically render tab titles -->
            <TabList>
                <Tab v-for="tab in tabs" :key="tab.title" :value="tab.value">
                    {{ tab.title }}
                </Tab>
            </TabList>

            <!-- Maintain TabPanel structure while lazy loading components -->
            <TabPanels>
                <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
                    <component :is="tab.component" v-if="renderedComponents.has(tab.value)" />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>