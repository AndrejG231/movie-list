class CacheService {
  getFromCache(cacheKey: string) {
    return localStorage.getItem(cacheKey)
  }

  saveToCache(cacheKey: string, value: string) {
    localStorage.setItem(cacheKey, value)
  }

  /**
   * Try to retrieve data by specified callback, and save it to cache
   * Returns cached version of data if validation fails
   *
   * @param cacheKey access key to the cache
   * @param caller callback for retrieving specific data
   * @param validator callback for validating
   */
  async retrieveWithCache<Data>(
    cacheKey: string,
    caller: () => Promise<Data>,
    validator: (data: Data | null | undefined) => data is Data
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
