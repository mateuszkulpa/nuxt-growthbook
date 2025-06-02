import type { GrowthBook } from '@growthbook/growthbook'
import { initializeGrowthBook } from '../../shared/initializeGrowthBook'

let growthbook: GrowthBook

export async function useGrowthbook() {
  if (!growthbook) {
    growthbook = await initializeGrowthBook()
  }

  return growthbook
}
