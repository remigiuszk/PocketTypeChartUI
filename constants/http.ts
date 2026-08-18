export const BASE_URL: string =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "https://ca-pocket-type-chart-dev.thankfulbush-d0597784.polandcentral.azurecontainerapps.io/api";

//export const BASE_URL: string = "http://192.168.100.4:5062/api";
//export const BASE_URL: string =
//Platform.OS === "web" ? "http://localhost:5062/api" : "http://10.0.2.2:5062/api";
//export const BASE_URL : string = "https://pockettypechart-fjahb0dzb3ebh5dk.polandcentral-01.azurewebsites.net/api"
export const POKETYPES_ENDPOINT: string = "/poketypes";
export const DAMAGERELATIONS_ENDPOINT: string = "/damagerelations";
export const ALL_ENDPOINT: string = "/all";

// The backend now serves sprites itself (cached, to avoid hammering the
// upstream PokeAPI/GitHub rate limits) and returns them as a path relative
// to the API origin, e.g. "/api/poketypes/5/sprite", rather than a full URL.
const API_ORIGIN: string = BASE_URL.replace(/\/api\/?$/, "");

export const resolveSpriteUrl = (sprite: string): string =>
  /^https?:\/\//i.test(sprite) ? sprite : `${API_ORIGIN}${sprite}`;
