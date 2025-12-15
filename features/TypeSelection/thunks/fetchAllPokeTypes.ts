import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../api/apiInstance";
import { POKETYPES_ENDPOINT } from "../../../constants";

export const fetchAllPokeTypes = createAsyncThunk(
  "pokeTypes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(POKETYPES_ENDPOINT);
      return response.data;
    } catch (err: any) {
    //TODO check for errors in api and set message accordingly
      return rejectWithValue(err?.message ?? "Failed to fetch poke types");
    }
  }
);