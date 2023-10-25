<template>
  <div class="queue-type pr-4">
    <div id="game-type" class="text-bold">
        {{ gameType }}
    </div>
    <div id="time-stamp">
        <div>
            {{moment(creation).fromNow()}}
        </div>
    </div>
    <div id="game-details">
        <div id="win">
            {{win ? "Victory": "Defeat"}}
        </div>
        <div id="duration">
            {{gameDuration(duration)}}
        </div>
    </div>
</div>
</template>

<script setup>
import moment from "moment"
const { duration, creation, type, win } = defineProps(['duration', 'creation', 'type', 'win'])
function gameDuration(duration) {
  let hours = Math.floor(duration / 60 / 60);
  let minutes = Math.floor(duration / 60) - hours * 60;
  let seconds = duration % 60;

  return `${minutes}m ${seconds}s`;
}
const gameType = computed(() => removeFirstAndLastWords(type))
function removeFirstAndLastWords(str) {
    const words = str.split(' ');

    if (words.length <= 2) {
        return '';  
    }

    words.shift();  
    words.pop();    

    return words.join(' ');
}
</script>

<style>
.queue-type {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

</style>