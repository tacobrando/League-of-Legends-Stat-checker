<template>
  <ul>
    <li v-for="(player, index) in team" class="flex items-center" :key="index">
        <div class="championIcon relative">
            <NuxtImg 
                :src="`${championBase}${player.championName}.png`" 
                width="16"
                height="16"
                :alt="player.championName"
            />
        </div>
        <div class="championName truncate w-20">
            <a 
                class="text-xs sm:text-sm md:text-base"
                :href="`/summoner/${region}/${player.summonerName}`"
                :class="[player.summonerName.toLowerCase() === name.toLowerCase() ? 'bold' :'base']"
            >
                {{player.summonerName}}
            </a>
        </div>
    </li>
  </ul>
</template>
<script setup>
const { team } = defineProps(['team'])
const config = useRuntimeConfig()
const route = useRoute()
const championBase = config.public.championBase

const { region, name } = route.params
</script>
style