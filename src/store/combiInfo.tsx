import { createSlice } from "@reduxjs/toolkit";
import ProjectVariable from "../constant/ProjectVariable";

interface CombiInfoState {
    filteredInfo: string | string[] | undefined;
    groupedInfo: string | string[] | undefined;
}

const initialCombiInfoState: CombiInfoState = {
    filteredInfo: ProjectVariable.stateFilterDefaultValue,
    groupedInfo: ProjectVariable.groupCheckboxDefaultValue,
};

const combiInfoSlice = createSlice({
    name: "CombinationInfo",
    initialState: initialCombiInfoState,
    reducers: {
        changeFilteredInfo(state, action: { payload: { value: any } }) {
            state.filteredInfo = action.payload.value;
        },

        changeGroupedInfo(state, action: { payload: { values: any } }) {
            state.groupedInfo = action.payload.values;
        },
    },
});

export const combiInfoActions = combiInfoSlice.actions;
export default combiInfoSlice.reducer;
