import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rowForRequestType, rowType, rowsType } from "./store.types";
import axios from "axios";

const state: rowsType = {
  rows: [],
  loading: false,
  error: null,
};

interface newRowType extends Omit<rowType, "id" | "child" | "total"> {
  parentId: number | null;
}

export const fetchRows = createAsyncThunk("rowsSlice/fetchRows", async () => {
  const response = await axios.get("/api/outlay-rows/entity/128732/row/list");
  return response.data;
});

export const deleteRowRequest = createAsyncThunk(
  "rowsSlice/deleteRowRequest",
  async (rowId: number) => {
    const response = await axios.delete(`/api/outlay-rows/entity/128732/row/${rowId}/delete`);
    return response.data;
  }
);

export const createRowRequest = createAsyncThunk(
  "rowsSlice/createRowRequest",
  async (row: rowForRequestType) => {
    console.log("create request", row);
    const response = await axios.post(`/api/outlay-rows/entity/128732/row/create`, row, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
);

export const updateRowRequest = createAsyncThunk(
  "rowsSlice/updateRowRequest",
  async ({ rowId, row }: { rowId: number; row: Omit<rowType, "id" | "child" | "total"> }) => {
    const response = await axios.post(`/api/outlay-rows/entity/128732/row/${rowId}/update`, row, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  }
);

const rowsSlice = createSlice({
  name: "rowsSlice",
  initialState: state,
  reducers: {
    setRows: (state, action) => {
      state.rows = action.payload;
    },

    createRow: (state, action) => {
      const foreachFn = (rows: rowType[]) => {
        rows.forEach((row) => {
          if (row.id === action.payload)
            row.child = [
              ...row.child,
              {
                child: [],
                equipmentCosts: 0,
                estimatedProfit: 0,
                id: 1,
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: 0,
                rowName: "",
                salary: 0,
                supportCosts: 0,
                total: 0,
              },
            ];
          else foreachFn(row.child);
        });
      };
      console.log(action.payload);
      action.payload !== 2
        ? foreachFn(state.rows)
        : state.rows.push({
            child: [],
            equipmentCosts: null,
            estimatedProfit: null,
            id: 2,
            machineOperatorSalary: 0,
            mainCosts: 0,
            materials: 0,
            mimExploitation: 0,
            overheads: null,
            rowName: "",
            salary: null,
            supportCosts: 0,
            total: 0,
          });
    },

    deleteRow: (state, action) => {
      const filterFn = (rows: rowType[]) => {
        return rows.filter((row) => {
          if (row.id !== action.payload) {
            if (row.child.length) row.child = filterFn(row.child);
            return true;
          } else return false;
        });
      };

      state.rows = filterFn(state.rows);
    },

    updateRow: (state, action) => {
      let skip = false;
      const foreachFn = (rows: rowType[]) => {
        return rows.map((row) => {
          if (row.id === action.payload.id || (row.id === 2 && !row.total && !skip)) {
            skip = true;
            return { ...row, ...action.payload.row };
          } else {
            if (!skip) row.child = foreachFn(row.child);
            return row;
          }
        });
      };

      state.rows = foreachFn(state.rows);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRows.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload;
      })
      .addCase(fetchRows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(deleteRowRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRowRequest.fulfilled, (state, action) => {
        state.loading = false;
        rowsSlice.caseReducers.deleteRow(state, {
          payload: action.meta.arg,
          type: "",
        });
      })
      .addCase(deleteRowRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(createRowRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRowRequest.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
        rowsSlice.caseReducers.updateRow(state, {
          payload: { id: 1, row: action.payload.current },
          type: "",
        });

        action.payload.changed.length &&
          action.payload.changed.forEach((row: Omit<rowType, "child">) => {
            rowsSlice.caseReducers.updateRow(state, {
              payload: { id: row.id, row: row },
              type: "",
            });
          });
      })
      .addCase(createRowRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(updateRowRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRowRequest.fulfilled, (state, action) => {
        state.loading = false;

        rowsSlice.caseReducers.updateRow(state, {
          payload: { id: action.payload.current.id, row: action.payload.current },
          type: "",
        });

        action.payload.changed.length &&
          action.payload.changed.forEach((row: Omit<rowType, "child">) => {
            rowsSlice.caseReducers.updateRow(state, {
              payload: { id: row.id, row: row },
              type: "",
            });
          });
      })
      .addCase(updateRowRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default rowsSlice.reducer;
export const { setRows, createRow, deleteRow } = rowsSlice.actions;
