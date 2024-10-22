import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
  useLogger,
  addServerHandler,
} from '@nuxt/kit'
import defu from 'defu'

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
   * Determines whether errors should be thrown when requests to the GrowthBook API fail.
   * Enabling this option can be helpful if your application relies on the response from GrowthBook.
   * @default false
   */
  shouldThrowFetchingError: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-growthbook',
    configKey: 'growthbook',
  },
  defaults: nuxt => ({
    apiHost: 'https://cdn.growthbook.io',
    enableDevMode: nuxt.options.dev,
    shouldThrowFetchingError: false,
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
        growthbook: defu(options, {
          apiHost,
          clientKey,
        }),
      },
    })

    const resolver = createResolver(import.meta.url)
    addPlugin(resolver.resolve('./runtime/plugin'))
    addImports({
      name: 'useGrowthbook',
      as: 'useGrowthbook',
      from: resolver.resolve('runtime/composables/useGrowthbook'),
    })
    addServerHandler({
      route: '/_growthbook/features',
      handler: resolver.resolve('runtime/nitro/features.get'),
    })
  },
})
