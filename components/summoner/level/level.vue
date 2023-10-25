<template>
  <p>{{level}}</p>
</template>
<script setup>
import { useStore } from '~/store/store';
const level = computed(() => useStore().summoner?.summonerLevel)
</script>