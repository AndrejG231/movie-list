import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { Api, ApiResponse, IMovie } from "../../services/api"
import { cacheService } from "../../services/cache"
import { RootState } from "../StoreProvider"
import { movieListQuerySelector } from "./selectors"
import { MovieListFilters, MovieListQueryState, SortFilter } from "./types"

type State = {
  query: MovieListQueryState
  filters: MovieListFilters
}

const initialState: State = {
  query: {
    data: null,
    loading: false,
    error: null,
  },
  filters: {
    attributes: {},
    search: { value: "" },
    sort: { attr: null, type: "asc" },
  },
}

const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    startLoading: (state) => {
      return {
        ...state,
        query: {
          ...state.query,
          loading: true,
        },
      }
    },

    setResults: (state, action: PayloadAction<ApiResponse<IMovie[]>>) => {
      const { payload } = action

      return {
        ...state,
        query: {
          ...payload,
          loading: false,
        },
      }
    },

    setAttributeFilter: (
      state,
      action: PayloadAction<{ attribute: string; value: string | null }>
    ) => {
      const { attribute, value } = action.payload

      return {
        ...state,
        filters: {
          ...state.filters,
          attributes: {
            ...state.filters.attributes,
            [attribute]: value,
          },
        },
      }
    },

    setSearchFilter: (state, action: PayloadAction<string>) => {
      const searchQuery = action.payload

      return {
        ...state,
        filters: {
          ...state.filters,
          search: { value: searchQuery },
        },
      }
    },

    setSortFilter: (state, action: PayloadAction<SortFilter>) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          sort: action.payload,
        },
      }
    },
  },
})

export const { setResults, startLoading } = movieListSlice.actions

export const validateMovieListResponse = (
  data: ApiResponse<IMovie[]> | null | undefined
): data is ApiResponse<IMovie[]> => !!data?.status && Array.isArray(data.data)

const fetchData = createAsyncThunk(
  "movieList/fetchData",
  async (_, { dispatch, getState }) => {
    if (movieListQuerySelector(getState() as RootState).data) return

    dispatch(startLoading())

    const response = await cacheService.retrieveWithCache(
      "movieList",
      Api.movieList,
      validateMovieListResponse
    )

    dispatch(setResults(response))
  }
)

export const reducer = movieListSlice.reducer

export const actions = { setResults, startLoading, fetchData }
