import { platformCodes } from "~/server/constants"
import { getMatchById, getSummonerByName, isValidRegion } from "~/server/utils/helpers"

export default defineEventHandler(async (event) => {
  try {
    const name = getRouterParam(event, 'name')
    const region = getRouterParam(event, 'region').toUpperCase()
    const validRegion = isValidRegion(region)
    const validName = name.length > 1
  
    if(!validRegion && validName) return "Invalid arguments"
  
    const summonerApi = getSummonerByName(platformCodes[region][0], name)
    const summonerInfo = await $fetch(summonerApi)

    
    const matchHistoryApi = getMatchHistory(platformCodes[region][1], summonerInfo.puuid)
    const matchHistoryInfo = await $fetch(matchHistoryApi)

    const matchDetailsPromises = matchHistoryInfo.map((matchId) => {
      const apiUrl = getMatchById(platformCodes[region][1], matchId)
      return $fetch(apiUrl)  // assuming $fetch returns a promise
    })

    const matchDetails = await Promise.all(matchDetailsPromises)  

    const profile = {
      summoner: summonerInfo,
      matchHistory: matchDetails
    }
    
    return profile

  } catch(error) {
    return error
  }
})