import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { setUser, setToken, logout } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("from base", result);
  if (result?.error?.status === 401) {
    console.log("refreshing token");
    console.log("args", args);
    console.log("api", api);
    console.log("extraOptions", extraOptions);
    const refreshResult = await baseQuery(
      {
        url: "token/refresh/",
        method: "POST",
        headers: { Authorization: null },
      },
      api,
      extraOptions,
    );
    console.log("from refresh", refreshResult);
    if (refreshResult?.data) {
      api.dispatch(setUser(refreshResult.data.email));
      api.dispatch(setToken(refreshResult.data.access));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
