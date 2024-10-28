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
export const fetchMyCollaborations = createAsyncThunk(
	"collaborations/fetchMyCollaborations",
	async () => {
		const response = await fetcher(
			`/collaborations/mycollaborations/${localStorage.getItem("userid")}`
		);
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
		mycollabStatus: "idle",
		mycollabError: null,
		mycollabs: [],
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
			})
			.addCase(fetchMyCollaborations.pending, (state) => {
				state.mycollabStatus = "loading";
			})
			.addCase(fetchMyCollaborations.fulfilled, (state, action) => {
				state.mycollabStatus = "succeeded";
				state.mycollabs = action.payload;
			})
			.addCase(fetchMyCollaborations.rejected, (state, action) => {
				state.mycollabStatus = "failed";
				state.mycollabError = action.error.message;
			});
	},
});

export const { setCollabid } = collabSlice.actions;

export default collabSlice.reducer;
