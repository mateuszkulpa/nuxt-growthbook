import { useNuxtApp } from "#imports";
import { GrowthBook } from "@growthbook/growthbook";

export function useGrowthbook(): GrowthBook<Record<string, any>> {
  const nuxtApp = useNuxtApp();
  return nuxtApp.$growthbook;
}
