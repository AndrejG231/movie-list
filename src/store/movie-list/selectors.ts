import { RootState } from ".."

export const movieListSelector = (state: RootState) => state.movieList

export const movieListQuerySelector = (state: RootState) =>
  state.movieList.query

export const movieListFiltersSelector = (state: RootState) =>
  state.movieList.filters
