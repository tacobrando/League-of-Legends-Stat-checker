
import type { Loading } from 'element-plus/es/components/loading/src/service';
<template>
  <div className="action">
    <button @click="toggleDetail" :class="['detail transition-colors', status ? 'btnVictory' : 'btnDefeat']">
        <font-awesome-icon 
            v-if="!isOpen"
            class="transition-transform transform" 
            width="24" 
            height="24" 
            icon="chevron-down" 
        />
        <font-awesome-icon 
          v-else
          class="transition-transform transform" 
          width="24" 
          height="24" 
          icon="chevron-up" 
        />
    </button>
  </div>
</template>

<script setup>
const { match, status, isOpen } = defineProps(['match', 'status', 'isOpen'])

const emit = defineEmits()
function toggleDetail() {
  emit("toggle")
}
</script>

<style>
.action {
  display: block;
  position: relative;
  width: 40px;
  height: 100%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
}

.action button {
  cursor: pointer;
  border: 0;
  padding: 0;
}

.detail {
  width: 40px;
  height: 100%;
}

.btnVictory {
  background-color: var(--blue200);
  color: var(--blue500);
}
.btnDefeat {
  background-color: var(--red200);
  color: var(--red500);
}

.btnVictory:hover {
  background-color: var(--blue100);
}
.btnDefeat:hover {
  background-color: var(--red100);
}

.action svg {
  position: absolute;
  bottom: 8px;
  left: 8px;
  transform: rotate(0deg);
}

</style>