import {
  defineNuxtPlugin,
  useRuntimeConfig,
  useFetch,
  createError,
} from "#imports";
import { GrowthBook } from "@growthbook/growthbook";
import { FeatureDefinition } from "@growthbook/growthbook/src/types/growthbook";

export default defineNuxtPlugin(async () => {
  const {
    public: { growthbook: growthbookOptions },
  } = useRuntimeConfig();
  // TODO: handle caching with custom nitro endpoint
  const { data, error } = await useFetch<{
    features: Record<string, FeatureDefinition>;
  }>(
    `${growthbookOptions.apiHost}/api/features/${growthbookOptions.clientKey}`,
    {
      key: "growthbook:features",
    },
  );

  if (growthbookOptions.shouldThrowFetchingError && error.value) {
    throw createError(
      `Cannot fetch features from growthbook: ${error.value.message}`,
    );
  }

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
