import { createSlice } from "@reduxjs/toolkit";
import { clearExpiredCache } from "../../utils/cache";

const initialState = {
  items:
    JSON.parse(
      localStorage.getItem("collection")
    ) || [],
};

const saveCollectionSafely = (items) => {
  try {
    localStorage.setItem(
      "collection",
      JSON.stringify(items)
    );
  } catch {
    clearExpiredCache();

    try {
      localStorage.setItem(
        "collection",
        JSON.stringify(items)
      );
    } catch {
      // If storage is still full, keep state in memory for this session.
    }
  }
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCollection: (
      state,
      action
    ) => {
      const alreadyExists =
        state.items.find(
          (item) =>
            item.id ===
              action.payload.id &&
            item.type ===
              action.payload.type
        );

      if (!alreadyExists) {
        state.items.push(action.payload);
        saveCollectionSafely(
          state.items
        );
      }
    },
    removeCollection: (
      state,
      action
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id ===
              action.payload.id &&
            item.type ===
              action.payload.type
          )
      );
      saveCollectionSafely(state.items);
    },
    clearCollection: (state) => {
      state.items = [];
      localStorage.removeItem(
        "collection"
      );
    },
  },
});

export const {
  addCollection,
  removeCollection,
  clearCollection,
} = collectionSlice.actions;

export default collectionSlice.reducer;
