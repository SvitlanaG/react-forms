import { createSlice } from '@reduxjs/toolkit';
import { countries } from '../../utils/constants/countries';

const initialState: string[] = countries;
const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {},
});

export default countriesSlice.reducer;
