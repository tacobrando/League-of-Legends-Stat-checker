<template>
  <NuxtImg v-if="avatar" :src="avatar" />
</template>

<script setup>
import { useStore } from '~/store/store';
const config = useRuntimeConfig()
const store = useStore()
const avatar = ref(null)

if(store.summoner.profileIconId !== undefined) {
  avatar.value = `${config.public.avatarBase}${store.summoner.profileIconId}.png`
}
</script>