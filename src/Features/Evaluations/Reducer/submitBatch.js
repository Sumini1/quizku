import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../Auth/Reducer/axios";

// 🟡 THUNK: submitBatch
export const submitBatch = createAsyncThunk(
  "batch/submit",
  async (data, { rejectWithValue }) => {
    try {
      // Validasi minimal
      if (!data.targets || data.targets.length === 0) {
        return rejectWithValue("Data tidak lengkap: targets kosong");
      }

      for (const target of data.targets) {
        if (
          typeof target.user_module_attempt_target_type !== "number" ||
          typeof target.user_module_attempt_target_id !== "number"
        ) {
          return rejectWithValue("Data target tidak valid");
        }
      }

      const response = await api.post("/u/submit-batch", data);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Terjadi kesalahan";
      return rejectWithValue(message);
    }
  }
);

// 🔵 SLICE
const submitBatchSlice = createSlice({
  name: "submitBatch",
  initialState: {
    loading: false,
    error: null,
    success: false,
    submittedTargets: [],
    failedTargets: [],
    batchId: null,
    submissionStats: {
      total: 0,
      success: 0,
      failed: 0,
    },
  },
  reducers: {
    clearBatchState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.submittedTargets = [];
      state.failedTargets = [];
      state.batchId = null;
      state.submissionStats = {
        total: 0,
        success: 0,
        failed: 0,
      };
    },
    addToPendingTargets: (state, action) => {
      const count = Array.isArray(action.payload) ? action.payload.length : 1;
      state.submissionStats.total += count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBatch.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.success = false;

        const total = action?.meta?.arg?.targets?.length || 0;
        state.submissionStats.total = total;
      })
      .addCase(submitBatch.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;

        const { batchId, submittedTargets, failedTargets } = action.payload;

        state.batchId = batchId || null;
        state.submittedTargets = submittedTargets || [];
        state.failedTargets = failedTargets || [];

        state.submissionStats.success = submittedTargets?.length || 0;
        state.submissionStats.failed = failedTargets?.length || 0;
      })
      .addCase(submitBatch.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Gagal mengirim batch";
      });
  },
});

// 🔃 EXPORT
export const { clearBatchState, addToPendingTargets } =
  submitBatchSlice.actions;

export default submitBatchSlice.reducer;
