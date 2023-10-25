import { useErrorStore } from "./error";
export const useStore = defineStore('store', {
  state: () => ({
    region: '',
    summoner: {
      accountId: '',
      id: '',
      name: '',
      profileIconId: '',
      puuid: '',
      revisionDate: null,
      summonerLevel: null
    },
    matchHistory: []
  }),
  actions: {
    setRegion(region) {
      this.region = region
    },
    setSummonerInfo(data) {
      this.summoner = data
    },
    setMatchHistory(matches) {
      this.matchHistory = matches
    },
    async getSummonerInfo(region, name) {
      const { setError, resetErrors } = useErrorStore()
      const router = useRouter()
      resetErrors()
      const { data, error } = await useFetch(`/${region}/summoner/${name}`);
      if(error.value) {
        setError(error.value)
        router.push(`/error/${error.value.statusCode}`)
        return
      } else if(typeof data.value === 'string') {
        console.log(data.value)
        const errorData = {
          statusCode: 400,
          statusMessage: data.value
        }
        setError(errorData)
        router.push(`/error/${errorData.statusCode}`)
        return
      }
      if (data) {
        resetErrors()
        this.setSummonerInfo(data.value.summoner);
        this.setMatchHistory(data.value.matchHistory)

        router.push(`/summoner/${region}/${name}`)
        return data
      }
    },   
  }
})  