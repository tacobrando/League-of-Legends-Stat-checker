<template>
  <div class="w-full" :class="[win ? 'bg-blue-400' : 'bg-red-400', team[0].teamId === 100 ? 'rounded-t-lg' : 'rounded-b-lg']">
    <!-- Header -->
    <div class="w-full bg-gray-300 mb-1 flex justify-between items-center px-1" :class="[team[0].teamId === 100 ? 'rounded-t-lg' : '']">
      <span class="w-1/3 text-center">{{ win ? 'Victory' : 'Defeat'}} ({{ team[0].teamId === 100 ? 'Blue Team' : 'Red Team' }})</span>
      <span class="w-1/6 text-center">KDA</span>
      <span class="w-1/4 text-center">Damage</span>
      <span class="w-1/12 text-center">CS</span>
      <span class="w-1/4 text-center">Items</span>
    </div>
  <!-- Player Data -->
  <div v-for="player in team" class="text-white flex items-center p-2 text-xs sm:text-sm">
      <!-- Champion Info -->
      <span class="w-1/3 flex items-center space-x-2">
        <SummonerChampion :key="player.summonerId" :summoner="player" :spells="spells" :runes="runes" />
        <span>
          <a 
          :href="`/summoner/${region}/${player.summonerName}`"
          :class="[player.summonerName.toLowerCase() === name.toLowerCase() ? 'bold' :'base']"
          >
            {{player.summonerName}}
          </a>
          <p>Level {{player.summonerLevel}}</p>
        </span>
      </span>
      <!-- KDA -->
      <span class="w-1/6 flex flex-col items-center justify-center">
        <p>
          {{ player.kills }} / {{ player.deaths }} / {{ player.assists }}
        </p>
        <p>{{kdaParse(player.kills, player.assists, player.deaths)}}</p>
      </span>
      <!-- Damage -->
      <span class="w-1/4 flex justify-center items-center space-x-1">
        <span class="flex flex-col items-center ml-2">
          <div>{{ player.totalDamageDealtToChampions }}</div>
          <div class="progress-container bg-gray-700">
            <div :style="{ width: damagePercentage(player, 'dealt') + '%' }" class="progress-bar bg-red-700"></div>
          </div>
        </span>
        <span class="flex flex-col items-center mx-2">
          <div>{{ player.totalDamageTaken }}</div>
          <div class="progress-container bg-gray-700">
            <div :style="{ width: damagePercentage(player, 'taken') + '%' }" class="progress-bar bg-gray-500"></div>
          </div>
        </span>
      </span>
      <!-- CS -->
      <span class="w-1/12 flex items-center justify-center">
        {{ player.totalMinionsKilled }}
      </span>
      <!-- Items -->
      <span class="w-1/4 flex items-center justify-start space-x-1">
        <span v-for="item in allPlayerItems[player.participantId]" :key="item.id">
          <div v-if="item.id !== undefined" class="relative"> 
            <NuxtImg 
              width="22" 
              height="22" 
              :src="`${itemBase}${item.id}.png`" 
              :alt="item.name" 
              class="rounded-sm"
            />
          </div>
          <div v-else class="relative w-[18px] h-[18px] bg-black rounded-sm opacity-30"></div>
        </span>
      </span>
    </div>
  </div>
</template>

<script setup>
const { team, spells, runes, win } = defineProps(['team', 'spells', 'runes', 'win'])
const { name, region } = useRoute().params
const config = useRuntimeConfig()
const itemBase = config.public.itemBase

const highestPlayerDamage = computed(() => getHighestDamage(team, 'totalDamageDealtToChampions'))
const highestDamageTaken = computed(() => getHighestDamage(team, 'totalDamageTaken'))
const allPlayerItems = computed(() => {
    let itemsObj = {};
    team.forEach(player => {
        itemsObj[player.participantId] = getItems(player);
    });
    return itemsObj;
});

const damagePercentage = (player, option) => {
    let highestValue;
    let playerValue;

    switch(option) {
        case 'dealt':
            highestValue = highestPlayerDamage.value;
            playerValue = player.totalDamageDealtToChampions;
            break;
        case 'taken':
            highestValue = highestDamageTaken.value;
            playerValue = player.totalDamageTaken;
            break;
        default:
            return 0;
    }

    if (highestValue === 0) return 0;
    return (playerValue / highestValue) * 100;
}
</script>

<style scoped>
.progress-container {
  width: 40px;
  height: 4px;
  border-radius: 2px;
}

.progress-bar {
  height: 100%;
  border-radius: 2px;
}
</style>

