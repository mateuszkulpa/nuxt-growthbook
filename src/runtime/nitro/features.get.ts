import { defineEventHandler } from "h3";
import { useRuntimeConfig } from "#imports";
import type { FeatureDefinition } from "@growthbook/growthbook";

export default defineEventHandler(async () => {
  const {
    public: { growthbook: growthbookOptions },
  } = useRuntimeConfig();

  const response = await $fetch<{
    features: Record<string, FeatureDefinition>;
  }>(
    `${growthbookOptions.apiHost}/api/features/${growthbookOptions.clientKey}`,
  );

  return response.features;
});
