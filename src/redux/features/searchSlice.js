import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",

  initialState: {
    query: "",
    activeTab: "photos",
    results: [],
    loading: false,
    error: null,
    page: 1,
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },

    setActiveTabs(state, action) {
      state.activeTab = action.payload;
    },

    setResults(state, action) {
      state.results = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    clearResults(state) {
      state.results = [];
    },
    setPage(state, action) {
      state.page = action.payload;
    },

    nextPage(state) {
      state.page += 1;
    },

    prevPage(state) {
      if (state.page > 1) {
        state.page -= 1;
      }
    },
  },
});

export const {
  setQuery,
  setActiveTabs,
  setLoading,
  setResults,
  setError,
  clearResults,
  setPage,
  nextPage,
  prevPage,
} = searchSlice.actions;

export default searchSlice.reducer;
