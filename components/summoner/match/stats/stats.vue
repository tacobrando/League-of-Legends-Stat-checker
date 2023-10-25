<template>
  <div class="summoner-stats flex justify-center items-center h-full">
    <div class="flex flex-col justify-center h-full">
        <div class="flex">
            <div class="summoner-champion flex-shrink-0">
                <div class="icon">
                    <NuxtImg :src="`${championBase}${summoner.championName}.png`" height="48" width="48" :alt="summoner.championName" />
                    <span>
                        {{summoner.champLevel}}
                    </span>
                </div>
                <div class="spells">
                    <div class="spell">
                        <div class="relative">
                            <NuxtImg :src="`${spellBase}${spells.first}`" :alt="spells.first" />
                        </div>
                    </div>
                    <div class="spell">
                        <div class="relative">
                            <NuxtImg height="22" :src="`${spellBase}${spells.second}`" :alt="spells.second" />
                        </div>
                    </div>
                </div>
                <div class="runes flex items-center justify-center">
                    <div class="rune">
                        <div class="relative">
                            <NuxtImg height="22" :src="`${runeBase}${runes.first.icon}`" :alt="runes.first.key" />
                        </div>
                    </div>
                    <div class="rune">
                        <div>
                            <NuxtImg height="22" :src="`${runeBase}${runes.second.icon}`" :alt="runes.second.key" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="score flex flex-shrink-0 flex-col justify-center relative px-1 w-auto text-xs sm:text-base">
                <div class="kda">
                    <span>{{ summoner.kills }}</span> / <span id="deaths">{{summoner.deaths}}</span> / <span>{{summoner.assists}}</span>
                </div>
                <div class="ratio">
                    <span>{{kdaParse(summoner.kills, summoner.assists, summoner.deaths)}}</span> KDA
                </div>
            </div>
            <div class="stats pr-4 flex-col items-start text-xs hidden sm:flex">
                <div class="participation-kills">
                    <div class="relative text-red-500">
                        P/Kill {{(((summoner.kills + summoner.assists)/team.objectives.champion.kills)*100).toFixed(0)}}%
                    </div>
                </div>
                <div class="wards">Control Ward {{summoner.detectorWardsPlaced}}</div>
                <div class="creep-score">
                    <div class="relative">
                        CS {{summoner.totalMinionsKilled}} ({{minionParse(summoner.totalMinionsKilled, duration)}})
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center mt-2 h-[22px]">
            <div class="items">
              <ul>
                <li v-for="(item, index) in items" :key="index">
                  <div v-if="item.id !== undefined" class="relative">
                    <NuxtImg width="22" height="22" :src="`${itemBase}${item.id}.png`" :alt="item.name" />
                  </div>
                  <div v-else class="relative w-[22px] h-[22px] bg-black rounded-sm opacity-30"></div>
                </li>
              </ul>          
            </div>
        </div>
    </div>
  </div>
</template>
<script setup>
const { 
  summoner, 
  spells, 
  team, 
  teamId,
  runes,
  duration, 
  items 
} = defineProps(['summoner', 'spells', 'team', 'teamId', 'runes', 'duration', 'items'])

const config = useRuntimeConfig()
const spellBase = config.public.spellBase
const runeBase = config.public.runeBase
const itemBase = config.public.itemBase
const championBase = config.public.championBase

function minionParse(minions, duration) {
  let hours = Math.floor(duration / 60 / 60);
  let minutes = Math.floor(duration / 60) - hours * 60;
  let result = minions / minutes
  return Math.floor(result * 10) / 10
}

function kdaParse(kills, assists, deaths) {
  let kda = ((kills + assists)/deaths).toFixed(2)
  if(kda === "Infinity") {
      return "Perfect"
  }
  return kda
}

</script>