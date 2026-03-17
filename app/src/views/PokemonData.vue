<template>
  <div>
    <h2>{{ pokemon.name }}</h2>
    <h2>{{ pokemon.types }}</h2>
    <img :src="pokemon.sprites.front_default" alt="Pokemon image" />
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const pokemon = ref({})
async function getPokemon(id) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await response.json()
  pokemon.value = data
}
onBeforeMount(() => {
  getPokemon(route.params.id)
})
watch(
  () => route.params.id,
  (newId) => getPokemon(newId),
)
</script>

<style scoped></style>
