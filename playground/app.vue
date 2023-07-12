<template>
  <div>
    <pre>{{ homeBannerFeature }}</pre>
  </div>
</template>

<script setup lang="ts">
const growthbook = useGrowthbook();
const homeBannerFeature = growthbook.feature("home_banner");
</script>
