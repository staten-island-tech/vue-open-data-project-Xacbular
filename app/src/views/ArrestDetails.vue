<template>
  <div v-if="arrest" class="details">
    <h1>Arrest Details</h1>
    <h2>Description: {{ arrest.pd_desc }}</h2>
    <p>Offense: {{ arrest.ofns_desc }}</p>
    <p>Borough: {{ arrest.arrest_boro }}</p>
    <p>Age Group: {{ arrest.age_group }}</p>
    <p>Date: {{ arrest.arrest_date }}</p>
    <router-link to="/">Back to List</router-link>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const arrest = ref(null)

async function getArrestDetails(id) {
  const response = await fetch(
    `https://data.cityofnewyork.us/resource/uip8-fykc.json?arrest_key=${id}`,
  )
  const data = await response.json()
  arrest.value = data[0]
}

onBeforeMount(() => {
  getArrestDetails(route.params.id)
})

watch(
  () => route.params.id,
  (newId) => getArrestDetails(newId),
)
</script>

<style scoped>
.details {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
}
</style>
