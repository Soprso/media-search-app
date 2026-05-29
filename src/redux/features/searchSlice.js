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
    hasMore: true,
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    startSearch(state, action) {
      state.query = action.payload;
      state.results = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },

    setActiveTabs(state, action) {
      state.activeTab = action.payload;
    },
    switchTab(state, action) {
      state.activeTab = action.payload;
      state.results = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
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
    appendResults(state, action) {
      state.results.push(...action.payload);
    },
    setHasMore(state, action) {
  state.hasMore = action.payload;
},

resetHasMore(state) {
  state.hasMore = true;
},
  },
});

export const {
  setQuery,
  startSearch,
  setActiveTabs,
  switchTab,
  setLoading,
  setResults,
  setError,
  clearResults,
  setPage,
  nextPage,
  prevPage,
  appendResults,
    setHasMore,
  resetHasMore,
} = searchSlice.actions;

export default searchSlice.reducer;
