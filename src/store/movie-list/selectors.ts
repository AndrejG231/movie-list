import { RootState } from ".."

export const movieListQuerySelector = (state: RootState) =>
  state.movieList.query
