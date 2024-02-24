import { apiSlice } from "../../app/api/apiSlice";

export const changeDetectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: (page = 1) => `user/history/images/?page=${page}`,
      keepUnusedDataFor: 30,
    }),
    changeDetection: builder.mutation({
      query: (formData) => ({
        url: "change-detection/",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetHistoryQuery, useChangeDetectionMutation } =
  changeDetectionApiSlice;
