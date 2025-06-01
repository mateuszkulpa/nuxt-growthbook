import { GrowthBook } from '@growthbook/growthbook'
import {
  defineNuxtPlugin,
  useRuntimeConfig,
} from '#imports'

export default defineNuxtPlugin(async () => {
  const { public: { growthbook: options } } = useRuntimeConfig()

  const growthbook = new GrowthBook({
    apiHost: options.apiHost,
    clientKey: options.clientKey,
    enableDevMode: options.enableDevMode,
  })

  await growthbook.init({
    streaming: import.meta.client && options.streaming,
  })

  return {
    provide: {
      growthbook,
    },
  }
})
