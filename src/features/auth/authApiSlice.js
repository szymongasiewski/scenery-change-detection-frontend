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
    changePassword: builder.mutation({
      query: (body) => ({
        url: "user/change-password/",
        method: "POST",
        body: { ...body },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: "verify-email/",
        method: "POST",
        body: { ...body },
      }),
    }),
    resendOtp: builder.mutation({
      query: (body) => ({
        url: "resend-otp/",
        method: "POST",
        body: { ...body },
      }),
    }),
    passwordResetRequest: builder.mutation({
      query: (body) => ({
        url: "reset-password/",
        method: "POST",
        body: { ...body },
      }),
    }),
    passwordResetConfirm: builder.mutation({
      query: (body) => ({
        url: "reset-password-confirm/",
        method: "POST",
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
  useChangePasswordMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  usePasswordResetRequestMutation,
  usePasswordResetConfirmMutation,
} = authApiSlice;
