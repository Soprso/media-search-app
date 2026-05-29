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
  setActiveTabs,
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
