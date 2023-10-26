<template>
  <ElMenu 
    :default-active="activeIndex"
    mode="vertical"
    background-color="rgb(245 158 11/1)"
    active-text-color="white"
    text-color="white"
    class="shadow-md flex fixed"
    :ellipsis="false"
    router
  >
  <div class="nav-menu">
    <ElMenuItem index="/">LOLSTATS</ElMenuItem>
  </div>
  <div v-if="route.path !== '/'" id="navbar-search-input" class="bg-amber-500">
    <SummonerSearch />
  </div>
  </ElMenu>
</template>

<script setup>
const route = useRoute()
const activeIndex = computed(() => route.path)
</script>
<style scoped>
#navbar-search-input {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  padding: 10px;
}
.nav-menu {
  display: flex;
}
</style>