<template>
  <div class="container">
    <PokemonCard v-for="(mon, index) in pokemon" :key="mon.name" :pokemon="mon" :id="index + 1" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PokemonCard from '@/components/PokemonCard.vue'
const crime = ref([])
async function getCrime() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json?$limit=100')
    const data = await response.json()
    crime.value = data
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getCrime()
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
