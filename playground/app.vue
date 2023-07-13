<template>
  <div>
    <div v-if="bannerEnabled">BANNER</div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo,
      impedit?
    </div>
  </div>
</template>

<script setup lang="ts">
const gb = useGrowthbook();
const bannerEnabled = gb.isOn("banner_enabled");
</script>
