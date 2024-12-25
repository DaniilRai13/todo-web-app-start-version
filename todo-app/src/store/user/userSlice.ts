import { createSlice } from '@reduxjs/toolkit'
import { login, logout, register } from './user.actions'
import { IProfileData } from '../../config/user.data'

const initialState = {
	user: null as IProfileData | null,
	isLoading: false,
	isSuccess: false,
	error: null as string | undefined | null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(register.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(register.fulfilled, (state) => {
			state.isLoading = false
			state.isSuccess = true;
			state.error = null;
		})
		builder.addCase(register.rejected, (state, { error }) => {
			state.isLoading = false
			state.isSuccess = false;
			console.log(error)
			state.error = error.message;
		})

		//LOGIN

		builder.addCase(login.pending, state => {
			state.isLoading = true
		})
		builder.addCase(login.fulfilled, (state, { payload }) => {
			console.log(payload)
			state.isLoading = false
			state.user = payload
			// state.user = payload.user
		})
		builder.addCase(login.rejected, state => {
			state.isLoading = false
			state.user = null
		})
		builder.addCase(logout.pending, state => {
			state.isLoading = true
		})
		builder.addCase(logout.fulfilled, (state, { payload }) => {
			console.log(payload)
			state.isLoading = false
			state.user = null
			// state.user = payload.user
		})
		builder.addCase(logout.rejected, state => {
			state.isLoading = false
			state.user = null
		})
	},
})
export default userSlice.reducer