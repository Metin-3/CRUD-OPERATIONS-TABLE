import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";


//! GET USER
export const getUser = createAsyncThunk(
    "users/getUser", async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_SERVER}/users`);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch users');
        }
    },
);


//! POST USER
export const postUser = createAsyncThunk(
    'users/postUser',
    async (user, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_SERVER}/users`, user);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to add user');
        }
    },
);


//! UPDATE USER
export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({ id, ...user }, { rejectWithValue }) => {
        if (!id) return rejectWithValue("ID tapılmadı");
        try {
            const res = await axios.put(`${import.meta.env.VITE_API_SERVER}/users/${id}`, user);
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to update user')
        }
    },
);


//! DELETE USER
export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_SERVER}/users/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to delete user')
        }
    },
);



const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        //! GET USER
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            });


        //! POST USER
        builder
            .addCase(postUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(postUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
                notification.success({
                    message: 'User added successfully',
                    description: `Added user ${action.payload.name} to database.`,
                });
            })
            .addCase(postUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        //! UPDATE USER
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                    notification.success({
                        message: 'User information updated',
                        description: `${action.payload.name} has successfully updated its data.`,
                    });
                }

            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        //! DELETE USER
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter(item => item.id !== action.payload);
                notification.success({
                    message: 'User deleted',
                    description: 'The user has been successfully removed from the system.',
                });
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export default userSlice.reducer;