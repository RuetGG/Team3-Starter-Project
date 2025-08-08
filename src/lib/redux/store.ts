import { configureStore } from '@reduxjs/toolkit';
import { cycleApi } from './api/cycleApi';

export const store = configureStore({
  reducer: {
    [cycleApi.reducerPath]: cycleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cycleApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
