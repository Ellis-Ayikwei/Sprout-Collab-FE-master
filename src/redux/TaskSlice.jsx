import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetcher from "../helpers/fetcher";

const userId = localStorage.getItem("userid");
export const fetchtasks = createAsyncThunk(
	"tasks/fetchtasks",
	async (projectID, { dispatch }) => {
		const response = await fetcher(`projects/${projectID}/tasks`);
		console.log("Full API Response for task: ", response);
		// dispatch(setTaskMetaData(response.data.all_members));
		return response;
	}
);

const taskSlice = createSlice({
	name: "tasks",
	initialState: {
		taskList: [],
		taskListChecklists: [],
		taskMetaData: null,
		status: "idle",
		error: null,
		taskData: null,
	},
	reducers: {
		setTaskData: (state, action) => {
			state.taskData = action.payload;
		},
		setTaskChecklist: (state, action) => {
			state.taskListChecklists = action.payload;
		},
		setTaskMetaData: (state, action) => {
			state.taskMetaData = action.payload?.find(
				(taskMember) => taskMember.user_id === userId
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchtasks.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchtasks.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.taskList = action.payload;
			})
			.addCase(fetchtasks.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setTaskData, setTaskChecklist, setTaskMetaData } =
	taskSlice.actions;
export default taskSlice.reducer;
