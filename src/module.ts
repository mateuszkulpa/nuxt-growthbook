import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  useLogger,
  addServerImportsDir,
  addImportsDir,
} from '@nuxt/kit'
import defu from 'defu'

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    growthbook: {
      apiHost: string
      clientKey: string
      enableDevMode: boolean
      streaming: boolean
    }
  }
}

export interface ModuleOptions {
  /**
   * The host URL of the GrowthBook API.
   * @default "https://cdn.growthbook.io"
   */
  apiHost: string
  /**
   * Enables integration with GrowthBook DevTools.
   * @default false
   */
  enableDevMode: boolean
  /**
   * GrowthBook Client Key.
   */
  clientKey?: string
  /**
   * Enables real-time streaming updates (SSE) of feature definitions.
   * @default false
   */
  streaming: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-growthbook',
    configKey: 'growthbook',
  },
  defaults: nuxt => ({
    apiHost: 'https://cdn.growthbook.io',
    enableDevMode: nuxt.options.dev,
    streaming: false,
  }),
  setup(options, nuxt) {
    const logger = useLogger('growthbook')

    const apiHost = process.env.GROWTHBOOK_API_HOST || options.apiHost
    const clientKey = process.env.GROWTHBOOK_CLIENT_KEY || options.clientKey

    if (!clientKey) {
      logger.warn(
        'No client key was provided. Please make sure to pass one in nuxt.config.ts or GROWTHBOOK_CLIENT_KEY environment variable.',
      )
    }

    nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, {
      public: {
        growthbook: {
          apiHost,
          clientKey,
          enableDevMode: options.enableDevMode,
          streaming: options.streaming,
        },
      },
    })

    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/client/plugin'))
    addImportsDir(resolver.resolve('./runtime/client/composables'))
    addServerImportsDir(resolver.resolve('./runtime/server/composables'))
  },
})
