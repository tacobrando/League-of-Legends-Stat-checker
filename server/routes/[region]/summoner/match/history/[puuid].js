import { platformCodes } from "~/server/constants"
import { isValidRegion, getMatchHistory } from "~/server/utils/helpers"

export default defineEventHandler(async (event) => {
  try {
    const region = getRouterParam(event, 'region').toUpperCase()
    const puuid = getRouterParam(event, 'puuid')
    const validRegion = isValidRegion(region)
    const validPuuid = typeof puuid === 'string'

    if(!validRegion || !validPuuid) return "Invalid arguments"

    const apiUrl = getMatchHistory(platformCodes[region][1], puuid)

    const matchHistory = await $fetch(apiUrl)

    return matchHistory
  } catch(error) {
    return error
  }
})