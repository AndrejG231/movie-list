import { configureStore } from "@reduxjs/toolkit"
import { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { reducer as movieList } from "./movie-list"

const store = configureStore({ reducer: { movieList } })

export const StoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>
}

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
