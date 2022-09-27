import axios, { AxiosInstance } from "axios"
import { BASE_URL, UNKNOWN_ERROR } from "./constants"
import { ApiResponse } from "./types/ApiResponse"
import { IMovie } from "./types/IMovie"

class Api {
  instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
    this.instance.interceptors.response.use(
      (res) => {
        if (res.status) {
          return { ...res, status: 1, error: null }
        }

        return {
          status: 0,
          data: null,
          error: UNKNOWN_ERROR,
        }
      },
      (error) => {
        return {
          status: 0,
          data: null,
          error,
        }
      }
    )
  }

  movieList(): Promise<ApiResponse<IMovie[]>> {
    return this.instance.get("videos.json")
  }
}

export default new Api(BASE_URL)
