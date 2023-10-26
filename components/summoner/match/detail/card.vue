<template>
  <div v-if="isOpen">
    <div class="w-full bg-gray-300 mb-1 text-center">
      Overview
    </div>
    <SummonerMatchDetailTeam :team="teams[0]" :spells="spells" :runes="runes" :win="win" />
    <SummonerMatchDetailTeam :team="teams[1]" :spells="spells" :runes="runes" :win="!win" />
  </div>
</template>
<script setup>
const { 
  isOpen, 
  teamInfo,
  teams,
  spells, 
  runes, 
  win 
} = defineProps(['isOpen', 'teamInfo', 'teams', 'spells', 'runes', 'win'])
</script>