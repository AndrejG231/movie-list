import React from "react"
import styled from "styled-components"

import { IMovie } from "../../services/api"

interface StyledMovieCardProps {
  bgUrl: string
}

const StyledMovieCard = styled.div<StyledMovieCardProps>`
  width: 300px;
  height: 200px;
  background: gray;
  background-image: url(${({ bgUrl }) => bgUrl});
  position: relative;
  transition: 100ms all linear;

  > .title {
    white-space: nowrap;
    text-align: center;
    font-size: 16px;
    line-height: 25px;
    height: 45px;
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
  }

  > .description {
    transition: 100ms all linear;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    transform: scale(1.1);
    > .description {
      opacity: 1;
    }
  }
`

interface MovieCardProps {
  movie: IMovie
}

const MovieCard = (props: MovieCardProps): JSX.Element => {
  const { movie } = props

  return (
    <StyledMovieCard bgUrl={movie.iconUri}>
      <h1 className="title">{movie.name}</h1>
      {movie.description && (
        <div className="description">
          <p>{movie.description}</p>
        </div>
      )}
    </StyledMovieCard>
  )
}

export default MovieCard
