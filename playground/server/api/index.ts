export default defineEventHandler(async () => {
  const growthbook = await useGrowthbook()

  if (!growthbook.isOn('route_enabled')) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Route is disabled',
    })
  }

  return {
    status: 'ok',
  }
})
