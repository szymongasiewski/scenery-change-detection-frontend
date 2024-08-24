import { apiSlice } from "../../app/api/apiSlice";

export const changeDetectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHistory: builder.query({
      query: (page = 1) => `user/history/images/?page=${page}`,
      keepUnusedDataFor: 30,
      providesTags: (result, error, page) => [{ type: "History", id: page }],
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
      providesTags: (result, error, id) => [{ type: "Request", id }],
    }),
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `image-request/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Request", id },
        { type: "History" },
      ],
    }),
  }),
});

export const {
  useGetHistoryQuery,
  useChangeDetectionMutation,
  useGetRequestQuery,
  useDeleteRequestMutation,
} = changeDetectionApiSlice;
