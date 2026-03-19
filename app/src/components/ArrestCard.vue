<template>
  <router-link class="card" :to="`/arrest/${arrest.arrest_key}`">
    <h2>{{ arrest.pd_desc }}</h2>
    <p>Arrest ID: {{ arrest.arrest_key }}</p>
    <p class="date">{{ arrest.arrest_date }}</p>
  </router-link>
</template>

<script setup>
const props = defineProps({
  arrest: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.card {
  width: 28%;
  min-height: 200px;
  background-color: #f0f8ff;
  margin: 15px;
  padding: 20px;
  border-radius: 8px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.card:hover {
  background-color: #e0f0ff;
}
h2 {
  font-size: 1.1rem;
  text-transform: uppercase;
}
</style>
