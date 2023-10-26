<template>
  <div>
    {{ error.statusCode }} {{ error.statusMessage }}
  </div>
</template>

<script setup>
import { useErrorStore } from '~/store/error';
const errorStore = useErrorStore()
const error = computed(() => errorStore.error)
// const errorMessages = {
//   400: 'Summoner info',
//   404: 'Summoner',
// }

</script>