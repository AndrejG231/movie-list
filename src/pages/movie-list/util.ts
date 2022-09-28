import { IMovie } from "../../services/api"
import {
  AttributeFilters,
  MovieListFilters,
} from "../../store/movie-list/types"

const joinFilters = (movie: IMovie, filters: AttributeFilters): boolean => {
  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (!value) {
      return acc
    }

    if (typeof movie[key as keyof IMovie] === "boolean") {
      value = Boolean(+value)
    }

    if (typeof movie[key as keyof IMovie] === "number") {
      value = Number(value)
    }

    return acc && movie[key as keyof IMovie] === value
  }, true)
}

export const getFilteredMovieList = (
  movies: IMovie[],
  filters: MovieListFilters
): IMovie[] => {
  const filtered = movies.filter(
    (movie) =>
      new RegExp(filters.search.value, "gi").test(movie.name) &&
      joinFilters(movie, filters.attributes)
  )

  if (!filters.sort.attr) return filtered

  const key = filters.sort.attr as keyof IMovie

  return filtered.sort((a, b) => {
    if (filters.sort.type === "desc") {
      const tmp = a
      a = b
      b = tmp
    }

    return ("" + a[key]).localeCompare("" + b[key])
  })
}
