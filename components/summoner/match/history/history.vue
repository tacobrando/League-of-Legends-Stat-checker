
<template>
  <div v-if="history" v-for="match in history" :key="match">
    <SummonerMatch :match="match" />
  </div>
</template>
<script setup>
import { useStore } from '~/store/store';
const { history } = defineProps(['history'])

const store = useStore()
const route = useRoute()
</script>