import { createSlice } from '@reduxjs/toolkit'
import { IProfileData } from '../../config/user.data'
import { login, logout, register, updateProfile, updateUserEmail, updateUserPassword } from './user.actions'
import { getUserFromStorage } from './user.localstorage'

const initialState = {
	user: getUserFromStorage() as IProfileData | null | undefined,
	isLoading: false,
	isSuccess: false,
	error: null as string | undefined | null,
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetStatus(state) {
			state.error = null;
			state.isSuccess = false;
			state.isLoading = false;
		},
	},
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
			state.isSuccess = true
			state.error = null
		})
		builder.addCase(login.rejected, (state, { error }) => {
			state.isLoading = false
			state.user = null
			state.error = error.message
		})

		//Logout
		builder.addCase(logout.pending, state => {
			state.isLoading = true
		})
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoading = false
			state.user = null
			state.isSuccess = true
			state.error = null
		})
		builder.addCase(logout.rejected, state => {
			state.isLoading = false
			state.user = null
		})

		// UpdateProfile

		builder.addCase(updateProfile.pending, state => {
			state.isLoading = true
		})
		builder.addCase(updateProfile.fulfilled, (state, { payload }) => {
			state.isLoading = false
			state.isSuccess = true;
			state.error = null;
			if (JSON.stringify(state.user) !== JSON.stringify(payload)) {
				state.user = payload
			}
		})
		builder.addCase(updateProfile.rejected, (state, { error }) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.error = error.message;
		})

		builder.addCase(updateUserPassword.pending, state => {
			state.isLoading = true
		})
		builder.addCase(updateUserPassword.fulfilled, (state) => {
			state.isLoading = false
			state.isSuccess = true;
			state.error = null;
		})
		builder.addCase(updateUserPassword.rejected, (state, { error }) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.error = error.message;
		})

		builder.addCase(updateUserEmail.pending, (state) => {
			state.isLoading = true
		})
		builder.addCase(updateUserEmail.fulfilled, (state) => {
			state.isLoading = false
			state.isSuccess = true;
			state.error = null;
		})
		builder.addCase(updateUserEmail.rejected, (state, { error }) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.error = error.message;
		})
	},
})
export const { resetStatus } = userSlice.actions;
export default userSlice.reducer