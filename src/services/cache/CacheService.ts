class CacheService {
  getFromCache(cacheKey: string) {
    return localStorage.getItem(cacheKey)
  }

  saveToCache(cacheKey: string, value: string) {
    localStorage.setItem(cacheKey, value)
  }

  async retrieveWithCache<Data>(
    cacheKey: string, // Access key to the cache
    caller: () => Data, // Callback for retrieving specific data
    validator: (data: Data) => boolean // Callback for validating
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

      cachedData = JSON.parse(cached) as Data

      const isCacheValid = validator(cachedData)

      if (!isCacheValid) {
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
