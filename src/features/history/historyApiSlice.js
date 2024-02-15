import { apiSlice } from "../../app/api/apiSlice";

export const historyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: () => "user/history/images/",
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetHistoryQuery } = historyApiSlice;
