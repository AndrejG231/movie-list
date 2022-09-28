import React, { useCallback, useEffect, useMemo } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import {
  AppDispatch,
  movieListActions,
  movieListFiltersSelector,
  movieListQuerySelector,
  useMovieListQuery,
} from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { MovieCard } from "../../components/movie-card"
import { FiltersMenu } from "../../components/filters-menu"
import { getFilteredMovieList } from "./util"

const StyledMovieListPage = styled.div`
  width: 100%;

  .movie-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    width: 1240px;
    gap: 10px;
    margin: 20px auto;
  }
`

const MovieListPage = () => {
  const { data, loading, error } = useMovieListQuery()

  const filters = useSelector(movieListFiltersSelector)

  const navigate = useNavigate()

  const filteredMovies = useMemo(() => {
    if (!data) return null

    return getFilteredMovieList(data, filters)
  }, [filters, data])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !filteredMovies) {
    return <div>Error</div>
  }

  return (
    <StyledMovieListPage>
      <FiltersMenu />
      <div className="movie-list">
        {filteredMovies.map((movie) => {
          const isPlayable = !movie.drm || movie.drm?.indexOf("DEMO_CLEAR") > -1

          return (
            <MovieCard
              movie={movie}
              key={movie.name}
              playable={isPlayable}
              onClick={() =>
                isPlayable && navigate(`play/${encodeURIComponent(movie.name)}`)
              }
            />
          )
        })}
      </div>
    </StyledMovieListPage>
  )
}

export default MovieListPage
