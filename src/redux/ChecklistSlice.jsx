import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../helpers/configEndpoints";
import fetcher from "../helpers/fetcher";

const userId = localStorage.getItem("userid");

export const fetchtaskCheckList = createAsyncThunk(
	"taskCheckList/fetchtaskCheckList",
	async (taskId, { dispatch }) => {
		const response = await fetcher(`/task/${taskId}/checklists`);
		dispatch(setTaskId(taskId));
		dispatch(fetchtaskMembers(taskId));
		return response;
	}
);

export const fetchtaskMembers = createAsyncThunk(
	"taskCheckList/fetchtaskMembers",
	async (taskId) => {
		const response = await fetcher(`/tasks/${taskId}/task_members`);
		return response;
	}
);

export const submitLink = createAsyncThunk(
	"link/taskmlink",
	async ({ taskMemberId, link }, { dispatch }) => {
		const response = await axiosInstance.put(`task_members/${taskMemberId}`, {
			link,
		});
		return response;
	}
);

const taskCheckListSlice = createSlice({
	name: "taskCheckList",
	initialState: {
		checkList: [],
		status: "idle",
		error: null,
		taskMData: null,
		task_id: null,
		taskMembers: [],
		taskMemberlink: null,
	},
	reducers: {
		setTaskId: (state, action) => {
			state.task_id = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchtaskCheckList.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchtaskCheckList.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.checkList = action.payload;
			})
			.addCase(fetchtaskCheckList.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(fetchtaskMembers.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchtaskMembers.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.taskMembers = action.payload;
				state.taskMData = action.payload.find(
					(taskMember) => taskMember.user_id === userId
				);
				
			})
			.addCase(fetchtaskMembers.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			})
			.addCase(submitLink.pending, (state) => {
				state.status = "loading";
			})
			.addCase(submitLink.fulfilled, (state, action) => {
				state.status = "succeeded";
				state.taskMemberlink = action.payload.link;
			})
			.addCase(submitLink.rejected, (state, action) => {
				state.status = "failed";
				state.error = action.error.message;
			});
	},
});

export const { setTaskId } = taskCheckListSlice.actions;

export default taskCheckListSlice.reducer;
