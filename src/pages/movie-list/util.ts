import { IMovie } from "../../services/api"
import {
  AttributeFilters,
  MovieListFilters,
  SortFilter,
} from "../../store/movie-list/types"

// Check if item properties are matching all specified filters
const joinFilters = <ItemType extends object>(
  item: ItemType,
  filters: AttributeFilters
): boolean => {
  return Object.entries(filters).reduce((acc, [key, value]) => {
    if (!value) {
      return acc
    }

    if (!(key in item)) {
      return false
    }

    const attribute = key as keyof ItemType

    if (typeof item[attribute] === "boolean") {
      value = Boolean(+value)
    }

    if (typeof item[attribute] === "number") {
      value = Number(value)
    }

    return acc && item[attribute] === value
  }, true)
}

// Filter out items from array which do not match specified filters
export const filterMovieList = <ItemType extends { name: string }>(
  items: ItemType[],
  filters: MovieListFilters
): ItemType[] => {
  return items.filter(
    (item) =>
      new RegExp(filters.search.value, "gi").test(item.name) &&
      joinFilters(item, filters.attributes)
  )
}

// Returns new array sorted by SortFilter
export const sortBySortFilter = <ItemType extends object>(
  items: ItemType[],
  filter: SortFilter
) => {
  if (!filter.attr) return items

  const key = filter.attr as keyof ItemType

  return items.sort((a, b) => {
    if (filter.type === "desc") {
      const tmp = a
      a = b
      b = tmp
    }

    return ("" + a[key]).localeCompare("" + b[key])
  })
}
