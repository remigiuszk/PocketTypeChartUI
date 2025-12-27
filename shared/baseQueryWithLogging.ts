import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../constants";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});

export const baseQueryWithLogging = async (args: any, api: any, extraOptions: any) => {
  const endpoint =
    typeof args === "string" ? args : `${args.method ?? "GET"} ${args.url}`;

  console.log("[RTKQ] Request →", endpoint);

  const result = await rawBaseQuery(args, api, extraOptions);

  if ("error" in result) {
    console.error("[RTKQ] Error ←", endpoint, result.error);
  } else {
    console.log("[RTKQ] Response ←", endpoint);
  }

  return result;
};
