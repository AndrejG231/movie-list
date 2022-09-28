class CacheService {
  getFromCache(cacheKey: string) {
    return localStorage.getItem(cacheKey)
  }

  saveToCache(cacheKey: string, value: string) {
    localStorage.setItem(cacheKey, value)
  }

  async retrieveWithCache<Data>(
    cacheKey: string, // Access key to the cache
    caller: () => Promise<Data>, // Callback for retrieving specific data
    validator: (data: Data | null | undefined) => data is Data // Callback for validating
  ) {
    const response = await caller()

    const isValid = validator(response)

    if (isValid) {
      this.saveToCache(cacheKey, JSON.stringify(response))
      return response
    }

    let cachedData: Data | null = null

    try {
      const cached = this.getFromCache(cacheKey)

      if (!cached) {
        throw new Error("Could not retrieve from cache.")
      }

      cachedData = JSON.parse(cached)

      if (!validator(cachedData)) {
        throw new Error("Invalid cache data")
      }

      return cachedData
    } catch {
      // Return original api response if could not retrieve correct data from cache
      return response
    }
  }
}

export default new CacheService()
