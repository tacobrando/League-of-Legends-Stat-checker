<template>
  <div class="match">
    <div :class="['flex rounded-lg w-[92vw] lg:w-[45vw]', gameStatus ? 'victory' : 'defeat', detailsCard ? 'mb-1' : 'mb-2']">
      <div class="flex m-2 w-full justify-between">
        <SummonerMatchQueue 
          :duration="match.info.gameDuration" 
          :creation="match.info.gameCreation"
          :type="matchType"
          :win="gameStatus"
        />
        <SummonerMatchStats 
          :summoner="playerInfo"
          :spells="spells"
          :runes="runes"
          :team="teamInfo.player"
          :teamId="teamId"
          :items="items"
          :duration="match.info.gameDuration" 
        />
        <span class="flex">
          <SummonerMatchTeam :team="teams[0]" />
          <SummonerMatchTeam :team="teams[1]" />
        </span>
      </div>  
      <div class="h-full">
        <SummonerMatchDetailButton 
          :match="match"
          :status="gameStatus"
          :isOpen="detailsCard"
          @toggle="toggleDetail"
        /> 
      </div> 
    </div>
  </div>
  <SummonerMatchDetailCard 
    :spells="spells"
    :runes="runes"
    :teamInfo="teamInfo"
    :teams="teams"
    :teamId="teamId"
    :win="gameStatus"
    :isOpen="detailsCard" 
    class="relative mb-1" 
  />
</template>
<script setup>
import { useStore } from '~/store/store';
const { match } = defineProps({
  match: {
    type: Object,
    required: true
  }
})
const summonerId = useStore().summoner.id
const teamId = computed(() => getTeamId(match.info.participants, summonerId))
const teams = computed(() => getTeams(match.info.participants, teamId))
const gameStatus = computed(() => getGameStatus(match.info.teams, teamId.value))
const playerInfo = computed(() => getSummonerInfo(match.info.participants, summonerId))
const matchType = computed(() => getMatchType(match.info.queueId))
const items = computed(() => getItems(playerInfo.value))
const teamInfo = reactive({
  player: getTeamInfo(match.info.teams, teamId.value),
  enemy: getTeamInfo(match.info.teams, teamId.value, 'enemy')
})
const spells = reactive({
  first: getSpell(playerInfo.value.summoner1Id),
  second: getSpell(playerInfo.value.summoner2Id)
})
const runes = reactive({
  first: getRune(playerInfo.value.perks.styles[0].style),
  second: getRune(playerInfo.value.perks.styles[1].style)
})

const detailsCard = ref(false)

function toggleDetail() {
  detailsCard.value = !detailsCard.value
}

</script>
<style>
@import url('./match.style.css');
</style>