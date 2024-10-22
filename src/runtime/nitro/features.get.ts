import { defineEventHandler } from 'h3'
import type { FeatureDefinition } from '@growthbook/growthbook'
import { useRuntimeConfig } from '#imports'

export default defineEventHandler(async () => {
  const {
    public: { growthbook: growthbookOptions },
  } = useRuntimeConfig()

  const response = await $fetch<{
    features: Record<string, FeatureDefinition>
  }>(
    `${growthbookOptions.apiHost}/api/features/${growthbookOptions.clientKey}`,
  )

  return response.features
})
