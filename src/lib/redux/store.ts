import { configureStore } from '@reduxjs/toolkit';
import { cycleApi } from './api/cycleApi';
import { profileApi } from './api/profileApi';


export const store = configureStore({
  reducer: {
    [cycleApi.reducerPath]: cycleApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cycleApi.middleware,
      profileApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
