import Items from '~/assets/json/items.json'
import Summoners from '~/assets/json/summoners.json'
import Runes from '~/assets/json/runes.json'
import Queues from '~/assets/json/queues.json'

export function getTeamInfo(teams, teamId, side = 'player') {
  const isEnemy = side === 'enemy';
  return teams.find(team => isEnemy ? team.teamId !== teamId : team.teamId === teamId);
}

export function getMatchType(queueId) {
  for(let i = 0; i < Queues.length; i++) {
      if(Queues[i]["queueId"] === queueId) {
          return Queues[i].description
      }
  }
  return null
}

export function getRune(id) {
  for(let i = 0; i < Runes.length; i++) {
      if(Runes[i].id === id) {
          return {
              key: Runes[i].key,
              icon: Runes[i].icon
          }
      }
  }
}

export function getSummonerInfo(data, summonerId) {
  for(let i = 0; i < data.length; i++) {
    if(data[i].summonerId === summonerId) {
        return data[i]
    }
  }
}

export function getGameStatus(teams, teamId) {
  for(let i  = 0; i < 2; i++) {
      if(teams[i].teamId === teamId) {
          return teams[i].win
      }
  }
}

export function getTeamId(participants, summonerId) {
  for(let i = 0; i < participants.length; i++) {
    if(participants[i].summonerId === summonerId) {
        return participants[i].teamId
    }
  }
}

export function getTeams(teams, teamId) {
  let sortOrder = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]
  let arrOne = []
  let arrTwo = []
  for(let i = 0; i < teams.length; i++) { 
      if(teams[i].teamId === teamId.value) {
          arrOne.push(teams[i])
      } else {
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

export function getItems(player) {
  let arr = []
  let keys = Object.keys(Items.data)
  if(player !== undefined) {
      for(let i = 0; i < keys.length; i++) {
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

export function getSpell(id) {
  let spells = Object.keys(Summoners.data)

  for(let i = 0; i < spells.length; i++) {
      if(parseInt(Summoners.data[spells[i]].key) === parseInt(id)) {
          return Summoners.data[spells[i]].image.full
      }
  }
  return ""
}

export function kdaParse(kills, assists, deaths) {
  let kda = ((kills + assists)/deaths).toFixed(2)
  if(kda === "Infinity") {
      return "Perfect"
  }
  return kda
}

export function minionParse(minions, duration) {
  let hours = Math.floor(duration / 60 / 60);
  let minutes = Math.floor(duration / 60) - hours * 60;
  let result = minions / minutes
  return Math.floor(result * 10) / 10
}

export function getTotalTeamDamageChampion(team) {
  var total = 0
  for(let i = 0; i < 5; i++) {
    total += team[i].totalDamageDealtToChampions
  }
  return total
}


export function getHighestDamage(team, property) {
  let highest = 0;
  for (let i = 0; i < 5; i++) {
      if (team[i][property] > highest) {
          highest = team[i][property];
      }
  }
  return highest;
}
