import { createSlice } from "@reduxjs/toolkit";
import { PokeTypesState } from "../../features/TypeSelection/types/PokeTypesState";
import { fetchAllPokeTypes } from "../../features/TypeSelection/thunks/fetchAllPokeTypes";

const initialState: PokeTypesState = {
  pokeTypes: [],
  status: "idle",
  error: null,
};

const pokeTypesSlice = createSlice({
  name: "pokeTypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPokeTypes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllPokeTypes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.pokeTypes = action.payload;
      })
      .addCase(fetchAllPokeTypes.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          (action.payload as string) ?? action.error.message ?? "Unknown error";
      });
  },
});

export default pokeTypesSlice.reducer;
