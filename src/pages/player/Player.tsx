import React, { useCallback, useMemo } from "react"
import Hls from "hls.js"
import { MediaPlayer } from "dashjs"
import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useMovieListQuery } from "../../store"

const StyledPlayer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .title {
    margin: 20px;
    text-align: center;
  }

  > video {
    margin-top: 50px;
    background: gray;
    width: 600px;
    height: 337.5px;
  }

  > .back-btn {
    position: absolute;
    top: 10px;
    left: 20px;
    color: white;
    background: gray;
    padding: 5px 10px;
    font-size: 20px;
    cursor: pointer;
  }
`

const playHls = (url: string, node: HTMLVideoElement) => {
  var hls = new Hls()
  hls.attachMedia(node)
  hls.loadSource(url)
}

const playDash = (url: string, node: HTMLVideoElement) => {
  const player = MediaPlayer().create()
  player.initialize(node, url, true)
}

const Player = () => {
  const { name } = useParams()

  const { data, loading } = useMovieListQuery()

  const navigate = useNavigate()

  const movie = useMemo(() => {
    if (!data) return null

    return data.find((movie) => movie.name === name)
  }, [name, data])

  const navigateToMovieList = () => {
    navigate("/")
  }

  const playVideoRef = useCallback(
    (node: HTMLVideoElement | null) => {
      if (!node || !movie) return

      const isDash = movie.manifestUri.endsWith("mpd")

      if (isDash) {
        playDash(movie.manifestUri, node)
        return
      }

      playHls(movie.manifestUri, node)
    },
    [movie]
  )

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <StyledPlayer>
      <button className="back-btn" onClick={navigateToMovieList}>
        Back to list
      </button>
      {!movie ? (
        <h1 className="title">Movie not found.</h1>
      ) : (
        <>
          <h1 className="title">{name}</h1>
          <video ref={playVideoRef} controls />
        </>
      )}
    </StyledPlayer>
  )
}

export default Player
