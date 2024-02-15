import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "login/",
        method: "POST",
        body: { ...body },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout/",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "register/",
        method: "POST",
        body: { ...body },
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "token/refresh/",
        method: "POST",
      }),
    }),
    deleteAccount: builder.mutation({
      query: (body) => ({
        url: "user/delete/",
        method: "DELETE",
        body: { ...body },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
  useDeleteAccountMutation,
} = authApiSlice;
