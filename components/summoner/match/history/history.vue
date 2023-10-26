
<template>
  <div v-if="history" v-for="match in history" :key="match">
    <SummonerMatch :match="match" />
  </div>
</template>
<script setup>
const { history } = defineProps(['history'])
</script>