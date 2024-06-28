import { createSlice } from "@reduxjs/toolkit";

interface initialState {
  editId: number;
  fields: {
    parentId: number | null;
    rowName: string;
    salary: number | undefined;
    equipmentCosts: number | undefined;
    overheads: number | undefined;
    estimatedProfit: number | undefined;
  };
}

const state: initialState = {
  editId: 0,
  fields: {
    parentId: null,
    rowName: "",
    salary: 0,
    equipmentCosts: 0,
    overheads: 0,
    estimatedProfit: 0,
  },
};

const editSlice = createSlice({
  name: "editSlice",
  initialState: state,
  reducers: {
    setEditId: (state, action) => {
      state.editId = action.payload.editId;
      if (action.payload.editId === 0) editSlice.caseReducers.clearFields(state);
      else state.fields = { ...state.fields, parentId: action.payload.parentId };
    },

    setFields: (state, action) => {
      state.fields = { ...state.fields, ...action.payload };
    },

    clearFields: (state) => {
      state.fields = {
        parentId: null,
        rowName: "",
        salary: undefined,
        equipmentCosts: undefined,
        overheads: undefined,
        estimatedProfit: undefined,
      };
    },
  },
});

export default editSlice.reducer;
export const { setEditId, setFields, clearFields } = editSlice.actions;
