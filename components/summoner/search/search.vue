<template>
  <ElForm :status-icon="true" :show-message="false" :model="searchForm" :rules="searchFormRules" ref="summonerSearchRef" id="summoner-search">
    <ElFormItem prop="region" :rules="searchFormRules.region">
      <ElSelect v-model="searchForm.region" placeholder="Region">
        <ElOption 
          v-for="region in regions" 
          :key="region.value"
          :label="region.label"
          :value="region.value"
          @click="handleSelect(region.value)"
          class="flex justify-between items-center"
        >
          <span class="float-left mr-2">{{ region.label }}</span>
          <span class="float-right ml-2">{{ region.value }}</span
          >
        </ElOption>
      </ElSelect> 
    </ElFormItem>
    <ElFormItem prop="name" :rules="searchFormRules.name" class="w-1/2">
      <ElInput @keyup.enter.native="handleSearch(summonerSearchRef)" v-model="searchForm.name" placeholder="Search for a summoner..." />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" @click="handleSearch(summonerSearchRef)">Search</ElButton>
    </ElFormItem>
  </ElForm>
</template>
<script setup>
import { regions } from '/constants/constants.js'
import { useStore } from '/store/store.js'

const store = useStore()
const summonerSearchRef = ref(null)

const searchForm = reactive({
  name: '',
  region: store.region,
})

const searchFormRules = reactive({
  name: {
    required: true,
    message: "Please input a summoner name",
    trigger: 'blur'
  },
  region: {
    required: true,
    message: 'Please select region',
    trigger: 'change',
  },  
})

// async function handleSearch() {
//   const isRegionSet = regions.find((region) => region.value === searchForm.region);
//   const isInputValid = searchForm.name !== '';
//   if(isRegionSet && isInputValid) {
//     await store.getSummonerInfo(searchForm.region, searchForm.name);
//   }
// }

async function handleSearch(form) {
  if(!form) return
  form.validate((valid) => {
    if(valid) {
     store.getSummonerInfo(searchForm.region, searchForm.name);
    } else {
      return false
    }
  })
}


function handleSelect(region) {
  store.setRegion(region)
}

// const searchInputRef = ref('')
// const regionSelectRef = ref(store.region)

watch(() => store.region, (newVal) => {
  searchForm.region = newVal
}, { immediate: true })
</script>

<style scoped>
#summoner-search {
  display: flex;
  height: auto;
}  
.el-form-item {
  margin-bottom: 0;
}

</style>