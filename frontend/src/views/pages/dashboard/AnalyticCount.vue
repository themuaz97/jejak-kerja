<template>
  <Card v-tooltip.bottom="'Total Job Application'">
    <template #title>
      Total Job Application
    </template>
    <template #content>
      <div class="flex justify-center">
        <div class="font-semibold text-5xl">
          <p>{{ totalJobs }}</p>
        </div>
      </div>
    </template>
  </Card>

  <Card v-tooltip.bottom="'Job applied this month'">
    <template #title>
      Job Applied this month
    </template>
    <template #content>
      <div class="flex justify-center">
        <div class="font-semibold text-5xl">
          <p>{{ totalJobsThisMonth }}</p>
        </div>
      </div>
    </template>
  </Card>

  <Card v-tooltip.bottom="'Job applied previous month'">
    <template #title>
      Job Applied previous month
    </template>
    <template #content>
      <div class="flex justify-center">
        <div class="font-semibold text-5xl">
          <p>{{ totalJobsLastMonth }}</p>
        </div>
      </div>
    </template>
  </Card>

  <Card v-tooltip.bottom="'Top Platform'">
    <template #title>
      Top Platform
    </template>
    <template #content>
      <div class="flex justify-center">
        <div class="font-semibold text-5xl">
          <p>{{ topPlatform }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { getDashboardCount } from '@/services/dashboard.service';
import { onMounted, ref } from 'vue';

const totalJobs = ref(0);
const totalJobsThisMonth = ref(0);
const totalJobsLastMonth = ref(0);
const topPlatform = ref('No Data');
const randomStrings = ['LinkedIn', 'JobStreet', 'Indeed', 'Glassdoor', 'Foundit', 'Hiredly'];

onMounted(() => {
  fetchAnalyticCount();
});

const fetchAnalyticCount = async () => {
  try {
    const { data } = await getDashboardCount();

    // Animate total jobs count
    animateCount(data.resData.analytics.totalJobs, totalJobs);
    animateCount(data.resData.analytics.totalJobsthisMonth, totalJobsThisMonth);
    animateCount(data.resData.analytics.totalJobsLastMonth, totalJobsLastMonth);

    // Randomize top platform with a small delay and animation
    const platform = data.resData.analytics.topPlatforms[0].platform;
    randomizePlatformName(platform);

  } catch (error) {
    console.error("Error fetching job application by status:", error.message);
  }
};

// Function to animate number count
const animateCount = (targetValue, refValue) => {
  let currentValue = 1;
  const increment = () => {
    if (currentValue < targetValue) {
      currentValue++;
      refValue.value = currentValue;
      requestAnimationFrame(increment);
    } else {
      refValue.value = targetValue;
    }
  };
  increment();
};

// Function to randomize platform name with delay and animation
const randomizePlatformName = (platform) => {
  let count = 0;
  const maxCount = 10; // how many random changes before showing the final platform name
  const interval = setInterval(() => {
    if (count >= maxCount) {
      clearInterval(interval);
      topPlatform.value = platform;
    } else {
      topPlatform.value = randomStrings[Math.floor(Math.random() * randomStrings.length)];
      count++;
    }
  }, 100); // change every 100ms
};
</script>

<style scoped>
/* Add your styles here */
</style>
