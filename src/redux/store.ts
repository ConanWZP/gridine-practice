import {combineReducers, configureStore } from '@reduxjs/toolkit'
import filtersSlice from "./slices/filtersSlice";





const  rootReduce = combineReducers({
    filters: filtersSlice
})


export const store = configureStore({
    reducer: rootReduce,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch