import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "helpers/configEndpoints";
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

export const fetchUserTaskCheckList = createAsyncThunk(
    "tasks/fetchusertaskchecklist",
    async (_, { getState }) => {
        const state = getState();
        const taskMemberId = state.tasks.task_member_id;

        if (!taskMemberId) {
            throw new Error("Task member ID is missing");
        }

        console.log("Fetching checklist for task_member_id: ", taskMemberId);
        const response = await axiosInstance(
            `/tasks/${taskMemberId}/user_checklist_items/${userId}`
        );
        
        // Return only the serializable part of the response, typically `response.data`
        return response.data;
    }
);



const taskSlice = createSlice({
	name: "tasks",
	initialState: {
		taskList: [],
		taskListChecklists: [],
		userChecklistData: [],
		taskMetaData: null,
		status: "idle",
		error: null,
		taskData: null,
		task_member_id: null,
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
			state.task_member_id = state.taskMetaData?.id;
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
			})
			.addCase(fetchUserTaskCheckList.fulfilled, (state, action) => {
				console.log("Full API Response for user checklist: ", action.payload);
				state.userChecklistData = action.payload;
			})
			.addCase(fetchUserTaskCheckList.rejected, (state, action) => {
				console.log("API call failed: ", action.error.message);
				state.error = action.error.message;
			});
	},
});

export const { setTaskData, setTaskChecklist, setTaskMetaData } =
	taskSlice.actions;
export default taskSlice.reducer;
