import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../helpers/fetcher";

// Thunk to fetch collaborations for a specific goal
export const fetchCollaborations = createAsyncThunk(
	"collaborations/fetchCollaborations",
	async (goalId) => {
		const response = await fetcher(`goals/${goalId}/collaborations`);
		
		return response;
	}
);

const collabSlice = createSlice({
	name: "collaborations",
	initialState: {
		collaborations: [],
		collabid: null,
		status: "idle",
		error: null,
	},
	reducers: {
		setCollabid(state, action) {
			state.collabid = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCollaborations.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchCollaborations.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.collaborations = action.payload;
			})
			.addCase(fetchCollaborations.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setCollabid } = collabSlice.actions;

export default collabSlice.reducer;
