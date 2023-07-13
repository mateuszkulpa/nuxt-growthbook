import { defineNuxtPlugin, useRuntimeConfig, useFetch } from "#imports";
import { GrowthBook } from "@growthbook/growthbook";
import { FeatureDefinition } from "@growthbook/growthbook/src/types/growthbook";

export default defineNuxtPlugin(async () => {
  const {
    public: { growthbook: growthbookOptions },
  } = useRuntimeConfig();
  // TODO: handle caching with custom nitro endpoint
  const { data } = await useFetch<{
    features: Record<string, FeatureDefinition>;
  }>(
    `${growthbookOptions.apiHost}/api/features/${growthbookOptions.clientKey}`,
    {
      key: "growthbook:features",
    },
  );

  // TODO: handle error and throw exception based on module options

  console.log(data.value?.features);

  const growthbook = new GrowthBook({
    features: data.value?.features ?? {},
    enableDevMode: growthbookOptions.enableDevMode,
  });

  return {
    provide: {
      growthbook,
    },
  };
});
