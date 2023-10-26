<template>
  <div class="summoner-profile m-4" v-if="isLoaded">
    <div class="flex justify-start items-end">
      <span class="relative inline-block">
        <SummonerAvatar class="block w-full rounded-lg" />
        <SummonerLevel class="bg-blue-900 text-white border border-gray-400 rounded-full px-1 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </span>
      <span class="ml-4 flex flex-col">
        <SummonerName class="text-2xl font-bold" />
        <ElButton type="primary" @click="getSummonerData">Update</ElButton>
      </span>
    </div>
    <div class=" mt-8 flex flex-col justify-center items-start md:items-center">
      <SummonerMatchHistory :history="matchHistory" />
    </div>
  </div>
  <div v-else class="p-5 h-full flex justify-center items">
    <LoadingIndicator />
  </div>
</template>


<script setup>
import { useStore } from '~/store/store';

const store = useStore();
const route = useRoute();
const summonerInfo = ref(null)
const matchHistory = ref(null);

const isLoaded = computed(() => (summonerInfo.value && matchHistory.value))


async function getSummonerData () {
  summonerInfo.value = null
  matchHistory.value = null
  if(!summonerInfo.value) {
    const { region, name } = route.params;
    const summonerData = await store.getSummonerInfo(region, name);
    summonerInfo.value = summonerData.value.summoner
    matchHistory.value = summonerData.value.matchHistory
  }
};
getSummonerData();
</script>
