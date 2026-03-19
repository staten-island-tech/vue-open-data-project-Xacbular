<template>
  <div class="container">
    <ArrestCard v-for="arrest in arrestList" :key="arrest.arrest_key" :arrest="arrest" />
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import ArrestCard from '@/components/ArrestCard.vue'
const arrestList = ref([])

async function getArrests() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json?$limit=100')
    const data = await response.json()
    arrestList.value = data
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onBeforeMount(() => {
  getArrests()
})
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
</style>
