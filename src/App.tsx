import React from "react"
import { createGlobalStyle } from "styled-components"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import MovieListPage from "./pages/movie-list/MovieList"
import { StoreProvider } from "./store"
import { Player } from "./pages/player"

const GlobalStyle = createGlobalStyle`
  body, * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const router = createBrowserRouter([
  {
    path: "/",
    element: <MovieListPage />,
  },
  {
    path: "/play/:name",
    element: <Player />,
  },
])

const Router = () => {
  return
}

function App() {
  return (
    <StoreProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
    </StoreProvider>
  )
}

export default App
