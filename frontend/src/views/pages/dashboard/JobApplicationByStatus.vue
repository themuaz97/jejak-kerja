<template>
  <div class="card flex justify-center">
    <div v-if="chartData && chartData.datasets[0].data.length > 0">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[20rem] sm:w-[20rem]" />
    </div>
    <div v-else>
      <p class="text-center py-44">No data available</p>
    </div>
  </div>
</template>

<script setup>
import { getJobApplicationByStatus } from "@/services/dashboard.service";
import { ref, onMounted } from "vue";

const chartData = ref(null);
const chartOptions = ref(null);

onMounted(() => {
  fetchJobApplicationByStatus();
});

// Color mapping object
const colorMap = {
  primary: '#c084fc',  // purple-400
  secondary: '#27272A', // gray-400
  success: '#4ade80',  // green-400
  info: '#38BDF8',    // blue-400
  danger: '#F87171',  // red-400
  warn: '#FB923C',    // yellow-400
  help: '#C084FC',    // purple-400
  contrast: '#FFFFFF', // white
};

const fetchJobApplicationByStatus = async () => {
  try {
    const { data } = await getJobApplicationByStatus();
    chartData.value = setChartData(data.resData.jobApplicationByStatus);
    chartOptions.value = setChartOptions();
  } catch (error) {
    console.error("Error fetching job application by status:", error.message);
  }
};

const setChartData = (jobApplicationByStatus) => {
  return {
    labels: jobApplicationByStatus.map((status) => status.name),
    datasets: [
      {
        data: jobApplicationByStatus.map((status) => status.count),
        backgroundColor: jobApplicationByStatus.map((status) => colorMap[status.color]),
        hoverBackgroundColor: jobApplicationByStatus.map((status) => colorMap[status.color]),
      }
    ]
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        }
      }
    }
  };
};
</script>