import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { GrowthBook } from "@growthbook/growthbook";

export default defineNuxtPlugin(() => {
  const {
    public: { growthbook: growthbookOptions },
  } = useRuntimeConfig();

  const growthbook = new GrowthBook(growthbookOptions);
  return {
    provide: {
      growthbook,
    },
  };
});
