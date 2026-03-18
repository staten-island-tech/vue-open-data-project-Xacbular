<template>
  <div>
    <h2>{{ crime.name }}</h2>
    <h2>{{ crime.types }}</h2>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const crime = ref({})
async function getCrime(id) {
  const response = await fetch(
    `https://data.cityofnewyork.us/resource/uip8-fykc.json?arrest_key=${id}`,
  )
  const data = await response.json()
  crime.value = data
}
onBeforeMount(() => {
  getCrime(route.params.id)
})
watch(
  () => route.params.id,
  (newId) => getCrime(newId),
)
</script>

<style scoped></style>

<!-- const response = await fetch(
  `https://data.cityofnewyork.us/resource/uip8-fykc.json?arrest_key=${id}`
); -->
