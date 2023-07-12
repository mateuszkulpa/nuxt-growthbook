<template>
  <div>
    <pre>{{ bannerEnabled }}</pre>
  </div>
</template>

<script setup lang="ts">
const growthbook = useGrowthbook();
const bannerEnabled = growthbook.getFeatureValue("banner_enabled", false);
</script>
