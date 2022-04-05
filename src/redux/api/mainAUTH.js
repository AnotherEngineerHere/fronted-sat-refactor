import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const mainAUTH = createApi({
  reducerPath: "mainAUTH",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/auth/login" }),
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (userToLogin) => ({
        //url: "appointment/",
        method: "POST",
        body: userToLogin,
      }),
    }),
  }),
});
export const { usePostLoginMutation } = mainAUTH;
