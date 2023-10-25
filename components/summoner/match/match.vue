<template>
  <div class="match">
    <div :class="['flex rounded-lg', gameStatus ? 'victory' : 'defeat', detailsCard ? 'mb-1' : 'mb-2']">
      <div class="flex m-2 w-full">
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
          :team="playerTeam"
          :teamId="teamId"
          :items="items"
          :duration="match.info.gameDuration" 
        />
        <span class="hidden md:flex">
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
  <SummonerMatchDetailCard :isOpen="detailsCard" class="relative mb-1" />
</template>
<script setup>
import { useStore } from '~/store/store';
import Items from '~/assets/json/items.json'
import Summoners from '~/assets/json/summoners.json'
import Runes from '~/assets/json/runes.json'
import Queues from '~/assets/json/queues.json'
const { match } = defineProps({
  match: {
    type: Object,
    required: true
  }
})
const summonerId = useStore().summoner.id
const teams = computed(() => getTeams(match.info.participants))
const teamId = computed(() => getTeamId(match.info.participants))
const gameStatus = computed(() => getGameStatus(match.info.teams, teamId.value))
const playerInfo = computed(() => getSummonerInfo(match.info.participants))
const matchType = computed(() => getMatchType(match.info.queueId))
const items = computed(() => getItems(playerInfo.value))
const playerTeam = computed(() => getTeamInfo(match.info.teams, teamId.value)) 
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

function getTeamInfo(team, teamId) {
  for(let i = 0; i < 2; i++) {
      if(team[i].teamId === teamId) {
          return team[i]
      }
  }
}

function getMatchType(queueId) {
  for(let i = 0; i < Queues.length; i++) {
      if(Queues[i]["queueId"] === queueId) {
          return Queues[i].description
      }
  }
  return null
}

function getRune(id) {
  for(let i = 0; i < Runes.length; i++) {
      if(Runes[i].id === id) {
          return {
              key: Runes[i].key,
              icon: Runes[i].icon
          }
      }
  }
}

function getSummonerInfo(data) {
  for(let i = 0; i < data.length; i++) {
    if(data[i].summonerId === summonerId) {
        return data[i]
    }
  }
}

function getGameStatus(teams, teamId) {
  for(let i  = 0; i < 2; i++) {
      if(teams[i].teamId === teamId) {
          return teams[i].win
      }
  }
}

function getTeamId(participants) {
  for(let i = 0; i < participants.length; i++) {
    if(participants[i].summonerId === summonerId) {
        return participants[i].teamId
    }
  }
}

function getTeams(teams) {
  let sortOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]
  let arrOne = []
  let arrTwo = []
  for(let i = 0; i < teams.length; i++) { 
      if(teams[i].teamId === 100) {
          arrOne.push(teams[i])
      } else if (teams[i].teamId === 200) {
          arrTwo.push(teams[i])
      }
  }
  arrOne.sort((a, b) => {
      return sortOrder.indexOf(a.teamPosition) - sortOrder.indexOf(b.teamPosition)
  })
  arrTwo.sort((a, b) => {
      return sortOrder.indexOf(a.teamPosition) - sortOrder.indexOf(b.teamPosition)
    })

  return [arrOne, arrTwo]
}

function getItems(player) {
  let arr = []
  let keys = Object.keys(Items.data)
  if(player !== undefined) {
      for(let i = 0; i <= keys.length; i++) {
          if(Items.data[player[`item${i}`]]) {
              arr.push({ 
                  id: player[`item${i}`],
                  name: Items.data[player[`item${i}`]].name
              })    
          } else if(player[`item${i}`] === 0) {
              arr.push({
                  id: Items.data[player[`item${i}`]],
                  name: null
              })
          }
      }
  }
  return arr
}

function getSpell(id) {
  let spells = Object.keys(Summoners.data)

  for(let i = 0; i < spells.length; i++) {
      if(parseInt(Summoners.data[spells[i]].key) === parseInt(id)) {
          return Summoners.data[spells[i]].image.full
      }
  }
  return ""
}

</script>
<style>
@import url('./match.style.css');
</style>