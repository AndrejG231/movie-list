import React, { useCallback, useEffect } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import {
  AppDispatch,
  movieListActions,
  movieListQuerySelector,
  useMovieListQuery,
} from "../../store"
import { useDispatch, useSelector } from "react-redux"
import { MovieCard } from "../../components/movie-card"
import { FiltersMenu } from "../../components/filters-menu"

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

  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>
  }

  if (error || !data) {
    return <div>Error</div>
  }

  return (
    <StyledMovieListPage>
      <FiltersMenu />
      <div className="movie-list">
        {data.map((movie) => {
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
