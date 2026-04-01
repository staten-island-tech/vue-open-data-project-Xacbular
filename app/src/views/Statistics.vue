<template>
  <main class="stats">
    <router-link to="/">Back to List</router-link>
    <h1>Statistics</h1>
    <div v-if="error" class="error">{{ error }}</div>
    <section v-if="loaded" class="charts">
      <article class="chart-box">
        <h3>Arrests by Age Group</h3>
        <Pie :data="ageChartData" :options="chartOptions" />
      </article>
      <article class="chart-box">
        <h3>Arrests by Offense</h3>
        <Bar :data="offenseChartData" :options="chartOptions" />
      </article>
    </section>
    <div v-else-if="!error">Loading...</div>
  </main>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Pie, Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale)

const allArrests = ref([])
const loaded = ref(false)

async function getAllArrests() {
  const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json?$limit=100')
  allArrests.value = await response.json()
  loaded.value = true
}

onBeforeMount(() => {
  getAllArrests()
})

const ageChartData = computed(() => {
  const counts = {}
  for (const a of allArrests.value) {
    const age = a.age_group ?? 'Unknown'
    counts[age] = (counts[age] ?? 0) + 1
  }
  const labels = Object.keys(counts)
  return {
    labels,
    datasets: [
      {
        data: labels.map((l) => counts[l]),
        backgroundColor: [
          'rgba(59,130,246,0.7)',
          'rgba(239,68,68,0.7)',
          'rgba(16,185,129,0.7)',
          'rgba(245,158,11,0.7)',
          'rgba(139,92,246,0.7)',
        ],
      },
    ],
  }
})

const offenseChartData = computed(() => {
  const counts = {}
  for (const a of allArrests.value) {
    const offense = a.ofns_desc ?? 'Unknown'
    counts[offense] = (counts[offense] ?? 0) + 1
  }
  const top5 = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
  return {
    labels: top5.map(([label]) => label),
    datasets: [
      {
        label: 'Arrests',
        data: top5.map(([, count]) => count),
        backgroundColor: 'rgba(59,130,246,0.6)',
      },
    ],
  }
})

const chartOptions = { responsive: true, plugins: { legend: { position: 'top' } } }
</script>

<style scoped>
.stats {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
}
.charts {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.chart-box h3 {
  margin-bottom: 10px;
  font-size: 1rem;
  color: #333;
}
.error {
  padding: 10px;
  background-color: #ffe0e0;
  border: 1px solid #f99;
  border-radius: 6px;
  color: #900;
  margin-bottom: 16px;
}
</style>
