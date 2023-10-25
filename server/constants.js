const config = useRuntimeConfig()

export const platformCodes = {
  "BR": ["br1", "americas"],
  "EUN": ["eun1", "europe"],
  "EUW": ["euw1", "europe"],
  "JP": ["jp1", "asia"],
  "KR": ["kr", "asia"],
  "LAN": ["la1", "americas"],
  "LAS": ["la2", "americas"],
  "NA": ["na1", "americas"],
  "OCE": ["oc1", "sea"],
  "PHI": ["ph2", "sea"],
  "RUS": ["ru", "europe"],
  "SG": ["sg2", "sea"],
  "THA": ["th2", "sea"],
  "TUR": ["tr1", "europe"],
  "TW": ["tw2", "sea"],
  "VN": ["vn2", "sea"],
}


export const apiBaseUrl = config.public.apiBase
export const apiKey = config.apiKey