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
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutUserMutation } =
  authApiSlice;
