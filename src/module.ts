import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImports,
  useLogger,
} from "@nuxt/kit";
import defu from "defu";

export interface ModuleOptions {
  apiHost: string;
  enableDevMode: boolean;
  clientKey?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-growthbook",
    configKey: "growthbook",
  },
  defaults: (nuxt) => ({
    apiHost: "https://cdn.growthbook.io",
    enableDevMode: nuxt.options.dev,
  }),
  setup(options, nuxt) {
    const logger = useLogger("growthbook");

    const apiHost = process.env.GROWTHBOOK_API_HOST || options.apiHost;
    const clientKey = process.env.GROWTHBOOK_CLIENT_KEY || options.clientKey;

    if (!clientKey) {
      logger.warn(
        "No client key was provided. Please make sure to pass one in nuxt.config.ts or GROWTHBOOK_CLIENT_KEY environment variable.",
      );
    }

    nuxt.options.runtimeConfig = defu(nuxt.options.runtimeConfig, {
      public: {
        growthbook: defu(options, {
          apiHost,
          clientKey,
        }),
      },
    });

    const resolver = createResolver(import.meta.url);
    addPlugin(resolver.resolve("./runtime/plugin"));
    addImports({
      name: "useGrowthbook",
      as: "useGrowthbook",
      from: resolver.resolve("runtime/composables/useGrowthbook"),
    });
  },
});
