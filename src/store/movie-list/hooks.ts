import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { movieListActions } from "."
import { AppDispatch } from "../StoreProvider"
import { movieListQuerySelector } from "./selectors"

export const useMovieListQuery = () => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(movieListActions.fetchData())
  }, [])

  return useSelector(movieListQuerySelector)
}
