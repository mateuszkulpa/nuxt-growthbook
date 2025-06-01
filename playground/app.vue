<template>
  <div>
    <div v-if="bannerEnabled">
      BANNER
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo,
      impedit?
    </div>
  </div>
</template>

<script setup lang="ts">
const gb = useGrowthbook()
const bannerEnabled = ref(gb.isOn('banner_enabled'))

gb.setRenderer(() => {
  bannerEnabled.value = gb.isOn('banner_enabled')
})
</script>
