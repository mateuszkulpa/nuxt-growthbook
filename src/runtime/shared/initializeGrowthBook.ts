import { GrowthBook } from '@growthbook/growthbook'
import { useRuntimeConfig } from '#imports'

export async function initializeGrowthBook(): Promise<GrowthBook> {
  const { public: { growthbook: options } } = useRuntimeConfig()

  const growthbook = new GrowthBook({
    apiHost: options.apiHost,
    clientKey: options.clientKey,
    enableDevMode: options.enableDevMode,
  })

  await growthbook.init({
    streaming: import.meta.client && options.streaming,
  })

  return growthbook
}
