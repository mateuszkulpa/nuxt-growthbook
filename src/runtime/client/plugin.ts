import { initializeGrowthBook } from '../shared/initializeGrowthBook'
import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin(async () => {
  const growthbook = await initializeGrowthBook()

  return {
    provide: {
      growthbook,
    },
  }
})
