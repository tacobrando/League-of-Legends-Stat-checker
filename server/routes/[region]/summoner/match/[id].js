import { platformCodes } from "~/server/constants"
import { isValidRegion, getMatchHistory } from "~/server/utils/helpers"

export default defineEventHandler(async (event) => {
  try {
    const region = getRouterParam(event, 'region')
    const matchId = getRouterParam(event, 'id')
    const validRegion = isValidRegion(region)
    const validId = typeof matchId === 'string'

    if(!validRegion || !validId) return "Invalid arguments"

  } catch (error) {
    return error
  }
})
