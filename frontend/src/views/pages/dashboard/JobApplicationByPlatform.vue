<template>
  <div class="card flex justify-center">
    <div v-if="chartData && chartData.datasets[0].data.length > 0">
      <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem] sm:w-[20rem]" />
    </div>
    <div v-else>
      <p class="text-center py-44">No data available</p>
    </div>
  </div>
</template>

<script setup>
import { getJobApplicationByPlatform } from "@/services/dashboard.service";
import { ref, onMounted } from "vue";

const chartData = ref();
const chartOptions = ref();

const fetchJobApplicationsByPlatform = async () => {
  try {
    const { data } = await getJobApplicationByPlatform();

    // Map Tailwind CSS colors for platforms
    const platformColors = [
      "bg-emerald-500",
      "bg-green-500",
      "bg-lime-500",
      "bg-red-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-yellow-500",
      "bg-teal-500",
      "bg-cyan-500",
      "bg-sky-500",
      "bg-blue-500",
      "bg-indigo-500",
      "bg-violet-500",
      "bg-purple-500",
      "bg-fuchsia-500",
      "bg-pink-500",
      "bg-rose-500",
      "bg-slate-500",
      "bg-gray-500",
      "bg-zinc-500",
      "bg-neutral-500",
      "bg-stone-500",
    ];

    // Tailwind's color utilities require extracting hex codes via JavaScript.
    const colorToHex = (colorClass) => {
      const el = document.createElement("div");
      el.className = colorClass;
      document.body.appendChild(el);
      const computedStyle = getComputedStyle(el);
      const hexColor = computedStyle.backgroundColor;
      document.body.removeChild(el);
      return hexColor;
    };

    const colorsHex = platformColors.map(colorToHex);

    chartData.value = {
      labels: data.resData.jobApplicationsByPlatform.map((item) => item.platform), // Platforms as labels
      datasets: [
        {
          data: data.resData.jobApplicationsByPlatform.map((item) => item.count), // Count as data
          backgroundColor: colorsHex,
          hoverBackgroundColor: colorsHex,
        },
      ],
    };

    chartOptions.value = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: getComputedStyle(document.documentElement).getPropertyValue("--text-color"),
          },
        },
      },
    };
  } catch (error) {
    console.error("Error fetching job applications by platform:", error.message);
  }
};

onMounted(() => {
  fetchJobApplicationsByPlatform();
});
</script>
