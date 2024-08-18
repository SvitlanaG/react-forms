import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: 'male' | 'female' | 'diverse';
    terms: boolean;
    picture: string | undefined;
    country: string;
}

export interface UsersState {
    users: UserProfile[];
}

const initialState: UsersState = {
    users: [],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserProfile>) => {
            state.users.push(action.payload);
        },
    },
});
export const { addUser } = userSlice.actions;
export default userSlice.reducer;
