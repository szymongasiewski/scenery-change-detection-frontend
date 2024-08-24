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
    getRequest: builder.query({
      query: (id) => `image-request/${id}/`,
      keepUnusedDataFor: 120,
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `image-request/${id}/delete/`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetHistoryQuery,
  useChangeDetectionMutation,
  useGetRequestQuery,
  useDeleteRequestMutation,
} = changeDetectionApiSlice;
