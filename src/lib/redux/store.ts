import { configureStore } from '@reduxjs/toolkit';
import { cycleApi } from './api/cycleApi';
import { profileApi } from './api/profileApi';
import { applicationListManagerApi } from './api/applicationListManagerApi'


export const store = configureStore({
  reducer: {
    [cycleApi.reducerPath]: cycleApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [applicationListManagerApi.reducerPath]: applicationListManagerApi.reducer
  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cycleApi.middleware,
      profileApi.middleware,
      applicationListManagerApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
