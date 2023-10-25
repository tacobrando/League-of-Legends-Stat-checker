import { apiBaseUrl, apiKey, platformCodes } from "../constants"

export const getSummonerByName = (region: string, name: string) => {
  return `https://${region}.${apiBaseUrl}/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
}
export const getMatchHistory = (region: string, puuid: string) => {
  return `https://${region}.${apiBaseUrl}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${apiKey}`
}
export const getMatchById = (region: string, id: string) => {
  return `https://${region}.${apiBaseUrl}/lol/match/v5/matches/${id}?api_key=${apiKey}`
}


export const isValidRegion = (region: string) => region in platformCodes
