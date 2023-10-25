<template>
  <p>{{ name }}</p>
</template>
<script setup>
import { useStore } from '~/store/store';
const name = computed(() => useStore().summoner?.name)
</script>