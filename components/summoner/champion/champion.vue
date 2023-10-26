<template>
  <div class="summoner-champion flex-shrink-0">
    <div class="icon">
        <NuxtImg :src="championImg" :height="championImgSize" :width="championImgSize" :alt="summoner.championName" />
        <span>
            {{summoner.champLevel}}
        </span>
    </div>
    <div class="spells">
        <div class="spell">
            <div class="relative">
                <NuxtImg :src="spellOne" :alt="spells.first" />
            </div>
        </div>
        <div class="spell">
            <div class="relative">
                <NuxtImg height="22" :src="spellTwo" :alt="spells.second" />
            </div>
        </div>
    </div>
    <div class="runes flex items-center justify-center">
        <div class="rune">
            <div class="relative">
                <NuxtImg height="22" :src="runePrimary" :alt="runes.first.key" />
            </div>
        </div>
        <div class="rune">
            <div>
                <NuxtImg height="22" :src="runeSecondary" :alt="runes.second.key" />
            </div>
        </div>
    </div>
</div>
</template>
<script setup>
const { summoner, spells, runes, champImageSize } = defineProps(['summoner', 'spells', 'runes', 'champImageSize'])
const config = useRuntimeConfig()

const championImgSize = computed(() => champImageSize ? champImageSize : '48' )

const championBase = config.public.championBase
const spellBase = config.public.spellBase
const runeBase = config.public.runeBase

const championImg = computed(() => `${championBase}${summoner.championName}.png`)

const spellOne = computed(() => `${spellBase}${spells.first}`)
const spellTwo = computed(() => `${spellBase}${spells.second}`)

const runePrimary = computed(() => `${runeBase}${runes.first.icon}`)
const runeSecondary = computed(() => `${runeBase}${runes.second.icon}`)

</script>