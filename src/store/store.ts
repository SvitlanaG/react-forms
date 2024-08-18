import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countries/countriesSlice';
import userReducer from './user/userSlice.ts';

export const store = configureStore({
    reducer: {
        countries: countriesReducer,
        user: userReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
