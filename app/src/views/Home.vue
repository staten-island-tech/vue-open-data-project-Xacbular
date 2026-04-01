<template>
  <main>
    <nav>
      <router-link to="/statistics" class="stats-link">View Statistics</router-link>
    </nav>
    <section class="search-section">
      <form @submit.prevent="handleSearch">
        <input v-model="searchQuery" type="text" placeholder="Search by offense..." />
        <button type="submit">Search</button>
      </form>
      <div v-if="error" class="error">{{ error }}</div>
    </section>
    <section class="container">
      <ArrestCard v-for="arrest in filteredList" :key="arrest.arrest_key" :arrest="arrest" />
    </section>
  </main>
</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import ArrestCard from '@/components/ArrestCard.vue'

const arrestList = ref([])
const searchQuery = ref('')
const error = ref(null)

async function getArrests() {
  try {
    const response = await fetch('https://data.cityofnewyork.us/resource/uip8-fykc.json?$limit=100')
    const data = await response.json()
    arrestList.value = data
  } catch (err) {
    error.value = 'Failed to load arrests. Please try again.'
  }
}

function handleSearch() {
  if (!searchQuery.value.trim()) {
    error.value = 'Please enter a search term.'
    return
  }
  error.value = null
}

const filteredList = computed(() =>
  !searchQuery.value.trim()
    ? arrestList.value
    : arrestList.value.filter(
        (a) =>
          a.pd_desc?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          a.ofns_desc?.toLowerCase().includes(searchQuery.value.toLowerCase()),
      ),
)

onBeforeMount(() => {
  getArrests()
})
</script>

<style scoped>
.search-section {
  width: 80vw;
  margin: 20px auto 0;
}
form {
  display: flex;
  gap: 10px;
}
input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  padding: 8px 18px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.container {
  width: 80vw;
  margin: 30px auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.error {
  padding: 10px;
  background-color: #ffe0e0;
  border: 1px solid #f99;
  border-radius: 6px;
  color: #900;
}
</style>
