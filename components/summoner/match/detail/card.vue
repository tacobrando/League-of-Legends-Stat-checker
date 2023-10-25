<template>
  <div v-if="isOpen" class="w-full bg-gray-300 text-center">
    Overview
  </div>
</template>
<script setup>
const { isOpen } = defineProps(['isOpen'])
</script>