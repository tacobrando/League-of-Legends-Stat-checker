<template>
  <div>
    <Navbar class="fixed w-full" />
    <NuxtPage :ui="appConfig.ui" />
  </div>
</template>
<script setup>
const appConfig = useAppConfig()

</script>