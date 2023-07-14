import {
  defineNuxtPlugin,
  useRuntimeConfig,
  useFetch,
  createError,
} from "#imports";
import { GrowthBook } from "@growthbook/growthbook";
import { type FeatureDefinition } from "@growthbook/growthbook";

export default defineNuxtPlugin(async () => {
  const {
    public: { growthbook: growthbookOptions },
  } = useRuntimeConfig();
  const { data, error } = await useFetch<Record<string, FeatureDefinition>>(
    "/_growthbook/features",
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
    features: data.value ?? {},
    enableDevMode: growthbookOptions.enableDevMode,
  });

  return {
    provide: {
      growthbook,
    },
  };
});
