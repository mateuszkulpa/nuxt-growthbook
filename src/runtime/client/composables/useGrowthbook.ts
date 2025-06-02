import type { GrowthBook } from '@growthbook/growthbook'
import { useNuxtApp } from '#imports'

export function useGrowthbook(): GrowthBook {
  const nuxtApp = useNuxtApp()
  return nuxtApp.$growthbook
}
