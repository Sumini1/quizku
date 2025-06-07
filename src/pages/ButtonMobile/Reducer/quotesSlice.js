import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../Features/Auth/Reducer/axios";

// Fetch quotes dengan logging yang lebih baik
export const fetchQuotes = createAsyncThunk(
  "quotes/fetch",
  async (batchNumber = 1, { rejectWithValue }) => {
    try {
      console.log("Fetching quotes with batch:", batchNumber);
      const response = await api.get(`/u/quotes?batch=${batchNumber}`);
      console.log("Full API Response:", response);
      console.log("Response Data:", response.data);

      const responseData = response.data;

      // Log the actual structure
      console.log("Response data type:", typeof responseData);
      console.log("Is array:", Array.isArray(responseData));
      console.log("Has data property:", responseData.hasOwnProperty("data"));

      // Handle berbagai kemungkinan format response
      if (Array.isArray(responseData)) {
        // Direct array response
        console.log("Direct array response detected");
        return {
          data: responseData,
          batch: batchNumber,
          total_available_batch: 1,
        };
      } else if (responseData && typeof responseData === "object") {
        if (responseData.data && Array.isArray(responseData.data)) {
          // Wrapped response with data property
          console.log("Wrapped response detected");
          return responseData;
        } else if (responseData.quotes && Array.isArray(responseData.quotes)) {
          // Alternative wrapper with quotes property
          console.log("Alternative quotes wrapper detected");
          return {
            data: responseData.quotes,
            batch: responseData.batch || batchNumber,
            total_available_batch: responseData.total_available_batch || 1,
          };
        } else {
          // Object but unknown structure
          console.log("Unknown object structure:", Object.keys(responseData));
          // Try to find array property
          const arrayProperty = Object.keys(responseData).find((key) =>
            Array.isArray(responseData[key])
          );

          if (arrayProperty) {
            console.log("Found array property:", arrayProperty);
            return {
              data: responseData[arrayProperty],
              batch: responseData.batch || batchNumber,
              total_available_batch: responseData.total_available_batch || 1,
            };
          }
        }
      }

      // If no valid format found
      console.log("No valid format found, throwing error");
      throw new Error("Format data tidak valid");
    } catch (error) {
      console.error("Error fetching quotes:", error);

      if (error.response) {
        console.error(`Status: ${error.response.status}`, error.response.data);

        if (error.response.status === 405) {
          const message =
            "Method Not Allowed: API hanya menerima metode lain selain GET";
          return rejectWithValue({ message, details: error.response.data });
        }
      }

      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Alternative implementation if GET is not supported
export const fetchQuotesPost = createAsyncThunk(
  "quotes/fetchPost",
  async (batchNumber = 1, { rejectWithValue }) => {
    try {
      console.log("Fetching quotes with POST, batch:", batchNumber);
      const response = await api.post("/u/quotes", { batch: batchNumber });
      console.log("POST Response Data:", response.data);

      const responseData = response.data;

      // Same handling as GET method
      if (Array.isArray(responseData)) {
        return {
          data: responseData,
          batch: batchNumber,
          total_available_batch: 1,
        };
      } else if (
        responseData &&
        responseData.data &&
        Array.isArray(responseData.data)
      ) {
        return responseData;
      } else {
        throw new Error("Format data tidak valid");
      }
    } catch (error) {
      console.error("Error fetching quotes with POST:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Create new quote
export const createQuote = createAsyncThunk(
  "quotes/create",
  async (quoteData, { rejectWithValue }) => {
    try {
      const response = await api.post("/u/quotes", quoteData);
      return response.data;
    } catch (error) {
      console.error("Error creating quote:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Update quote
export const updateQuote = createAsyncThunk(
  "quotes/update",
  async ({ quoteId, quoteData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/u/quotes/${quoteId}`, quoteData);
      return response.data;
    } catch (error) {
      console.error("Error updating quote:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Delete quote
export const deleteQuote = createAsyncThunk(
  "quotes/delete",
  async (quoteId, { rejectWithValue }) => {
    try {
      await api.delete(`/u/quotes/${quoteId}`);
      return quoteId;
    } catch (error) {
      console.error("Error deleting quote:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Toggle quote publication status
export const toggleQuotePublication = createAsyncThunk(
  "quotes/togglePublication",
  async ({ quoteId, isPublished }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/u/quotes/${quoteId}`, {
        is_published: isPublished,
      });
      return response.data;
    } catch (error) {
      console.error("Error toggling quote publication:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// Slice untuk quotes
const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    status: "idle",
    error: null,
    data: [],
    currentBatch: 1,
    totalAvailableBatch: 1,
    selectedQuote: null,
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    dailyQuote: null,
    lastFetchDate: null,
  },
  reducers: {
    resetQuotes: (state) => {
      state.status = "idle";
      state.error = null;
      state.data = [];
      state.currentBatch = 1;
      state.totalAvailableBatch = 1;
      state.selectedQuote = null;
      state.createStatus = "idle";
      state.updateStatus = "idle";
      state.deleteStatus = "idle";
      state.dailyQuote = null;
      state.lastFetchDate = null;
    },
    clearQuotesError: (state) => {
      state.error = null;
    },
    setSelectedQuote: (state, action) => {
      state.selectedQuote = action.payload;
    },
    clearSelectedQuote: (state) => {
      state.selectedQuote = null;
    },
    setCurrentBatch: (state, action) => {
      state.currentBatch = action.payload;
    },
    // Set daily quote berdasarkan tanggal hari ini
    setDailyQuote: (state, action) => {
      const today = new Date().toDateString();
      const quotes = action.payload;

      console.log("Setting daily quote with data:", quotes);

      if (quotes && quotes.length > 0) {
        // Gunakan tanggal hari ini sebagai seed untuk memilih quote
        const dateString = today;
        let hash = 0;
        for (let i = 0; i < dateString.length; i++) {
          const char = dateString.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Convert to 32bit integer
        }

        // Pastikan hash positif dan dalam range array
        const index = Math.abs(hash) % quotes.length;
        state.dailyQuote = quotes[index];
        console.log("Selected daily quote:", state.dailyQuote);
      } else {
        // Default quote jika tidak ada data
        console.log("Using default quote");
        state.dailyQuote = {
          quote_text:
            "Bacalah dengan menyebut nama Tuhanmu yang menciptakan. (QS. Al-Alaq: 1)",
          author: "Al-Qur'an",
        };
      }

      state.lastFetchDate = today;
    },
    // Local state update for optimistic updates
    updateQuoteInState: (state, action) => {
      const { quoteId, updates } = action.payload;
      const quoteIndex = state.data.findIndex(
        (quote) => quote.quote_id === quoteId
      );
      if (quoteIndex !== -1) {
        state.data[quoteIndex] = { ...state.data[quoteIndex], ...updates };
      }
    },
    // Reorder quotes locally
    reorderQuotes: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removed] = state.data.splice(sourceIndex, 1);
      state.data.splice(destinationIndex, 0, removed);

      // Update display_order for all affected quotes
      state.data.forEach((quote, index) => {
        quote.display_order = index + 1;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch quotes (GET method)
      .addCase(fetchQuotes.pending, (state) => {
        console.log("fetchQuotes pending");
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        console.log("fetchQuotes fulfilled with payload:", action.payload);

        state.status = "succeeded";
        state.error = null;

        // Ensure we have the correct structure
        const payload = action.payload;
        if (payload && payload.data && Array.isArray(payload.data)) {
          state.data = payload.data;
          state.currentBatch = payload.batch || 1;
          state.totalAvailableBatch = payload.total_available_batch || 1;

          console.log("Data successfully set:", state.data);

          // Set daily quote saat data berhasil di-fetch
          quotesSlice.caseReducers.setDailyQuote(state, {
            payload: state.data,
          });
        } else {
          console.error("Invalid payload structure:", payload);
          state.data = [];
          state.currentBatch = 1;
          state.totalAvailableBatch = 1;

          // Set default quote jika payload tidak valid
          quotesSlice.caseReducers.setDailyQuote(state, { payload: null });
        }
      })
      .addCase(fetchQuotes.rejected, (state, action) => {
        console.log("fetchQuotes rejected:", action.payload);
        state.status = "failed";
        state.error = action.payload || { message: "Terjadi kesalahan" };

        // Set default quote jika fetch gagal
        quotesSlice.caseReducers.setDailyQuote(state, { payload: null });
      })
      // Fetch quotes (POST method - alternative)
      .addCase(fetchQuotesPost.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchQuotesPost.fulfilled, (state, action) => {
        console.log("fetchQuotesPost fulfilled with payload:", action.payload);

        state.status = "succeeded";
        state.error = null;

        const payload = action.payload;
        if (payload && payload.data && Array.isArray(payload.data)) {
          state.data = payload.data;
          state.currentBatch = payload.batch || 1;
          state.totalAvailableBatch = payload.total_available_batch || 1;

          // Set daily quote saat data berhasil di-fetch
          quotesSlice.caseReducers.setDailyQuote(state, {
            payload: state.data,
          });
        } else {
          state.data = [];
          state.currentBatch = 1;
          state.totalAvailableBatch = 1;
          quotesSlice.caseReducers.setDailyQuote(state, { payload: null });
        }
      })
      .addCase(fetchQuotesPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || { message: "Terjadi kesalahan" };

        // Set default quote jika fetch gagal
        quotesSlice.caseReducers.setDailyQuote(state, { payload: null });
      })
      // Create quote
      .addCase(createQuote.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(createQuote.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        // Add new quote to the beginning of the array
        if (action.payload.data) {
          state.data.unshift(action.payload.data);
        }
      })
      .addCase(createQuote.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload || { message: "Gagal membuat quote" };
      })
      // Update quote
      .addCase(updateQuote.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateQuote.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updatedQuote = action.payload.data;
        if (updatedQuote) {
          const index = state.data.findIndex(
            (quote) => quote.quote_id === updatedQuote.quote_id
          );
          if (index !== -1) {
            state.data[index] = updatedQuote;
          }
        }
      })
      .addCase(updateQuote.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload || { message: "Gagal mengupdate quote" };
      })
      // Delete quote
      .addCase(deleteQuote.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteQuote.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        const deletedQuoteId = action.payload;
        state.data = state.data.filter(
          (quote) => quote.quote_id !== deletedQuoteId
        );
      })
      .addCase(deleteQuote.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload || { message: "Gagal menghapus quote" };
      })
      // Toggle publication status
      .addCase(toggleQuotePublication.fulfilled, (state, action) => {
        const updatedQuote = action.payload.data;
        if (updatedQuote) {
          const index = state.data.findIndex(
            (quote) => quote.quote_id === updatedQuote.quote_id
          );
          if (index !== -1) {
            state.data[index].is_published = updatedQuote.is_published;
          }
        }
      });
  },
});

export const {
  resetQuotes,
  clearQuotesError,
  setSelectedQuote,
  clearSelectedQuote,
  setCurrentBatch,
  setDailyQuote,
  updateQuoteInState,
  reorderQuotes,
} = quotesSlice.actions;

export default quotesSlice.reducer;
