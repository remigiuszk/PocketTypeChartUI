import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pokeTypes: [],
};

const pokeTypesSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    getAllPokeTypes: (state) => {
      return await insta
    },
  },
});

export const { getAllPokeTypes } = pokeTypesSlice.actions;

export default pokeTypesSlice.reducer;
