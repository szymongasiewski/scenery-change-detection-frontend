import { apiSlice } from "../../app/api/apiSlice";

export const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: (page = 1) => `user/history/images/?page=${page}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetHistoryQuery } = historyApiSlice;
