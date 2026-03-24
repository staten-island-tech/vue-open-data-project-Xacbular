<template>
  <div v-if="arrest" class="details">
    <h1>Arrest Details</h1>
    <h2>Description: {{ arrest.pd_desc }}</h2>
    <p>Offense: {{ arrest.ofns_desc }}</p>
    <p>Borough: {{ arrest.arrest_boro }}</p>
    <p>Age Group: {{ arrest.age_group }}</p>
    <p>Date: {{ arrest.arrest_date }}</p>
    <router-link to="/">Back to List</router-link>

    <!-- Charts -->
    <div class="charts">
      <div class="chart-box">
        <h3>Arrests by Age Group</h3>
        <Pie :data="ageChartData" :options="chartOptions" />
      </div>
      <div class="chart-box">
        <h3>Arrests by Offense</h3>
        <Bar :data="offenseChartData" :options="chartOptions" />
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onBeforeMount, ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
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

const route = useRoute()
const arrest = ref(null)
const allArrests = ref([])

async function getArrestDetails(id) {
  const response = await fetch(
    `https://data.cityofnewyork.us/resource/uip8-fykc.json?arrest_key=${id}`,
  )
  const data = await response.json()
  arrest.value = data[0]
}

async function getAllArrests() {
  const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json?$limit=100')
  allArrests.value = await response.json()
}

onBeforeMount(() => {
  getArrestDetails(route.params.id)
  getAllArrests()
})

watch(
  () => route.params.id,
  (newId) => getArrestDetails(newId),
)

// Pie — age group breakdown across all fetched arrests
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

// Bar — top 5 offenses across all fetched arrests
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
.details {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
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
</style>
