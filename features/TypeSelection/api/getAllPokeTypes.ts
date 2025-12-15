import { PokeType } from "../types/pokeType";
import { POKETYPES_ENDPOINT } from "../../../constants";
import instance from "../../../api/apiInstance";

export async function getAllPokeTypes(): Promise<PokeType[]>{
    const response = await instance.get<PokeType[]>(POKETYPES_ENDPOINT);
    return response.data;
}