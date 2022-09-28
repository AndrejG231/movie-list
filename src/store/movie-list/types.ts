import { IMovie } from "../../services/api"

export type MovieListQueryState = {
  data: IMovie[] | null
  loading: boolean
  error: Error | null
}

export type AttributeFilters = Record<string, string | null>

export type SearchFilter = {
  value: string
}

export type SortFilter = {
  attr: string | null
  type: "asc" | "desc"
}

export type MovieListFilters = {
  attributes: AttributeFilters
  search: SearchFilter
  sort: SortFilter
}
