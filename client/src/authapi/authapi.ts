import { createApi } from "@reduxjs/toolkit/query/react";
import {baseQuery} from "./basequery"

export const _token = localStorage.getItem("accessToken");

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface RegisterUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface UserLoginInput {
  email: string;
  password: string;
}

const transformResponse = (response: any, accessTokenKey: string) => {
  localStorage.setItem(accessTokenKey, response.token);
  return response;
};



export const authapi = createApi({
  reducerPath: "authapi",
  baseQuery:baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterUserInput, RegisterUserInput>({
      query: (body) => ({
        url: "auth/signup",
        method: "POST",
        body,
      }),
      transformResponse: (response): any => {
        transformResponse(response, "accessToken");
      },
    }),
    userLogin: builder.mutation<UserLoginInput, UserLoginInput>({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (response) =>
        transformResponse(response, "accessToken"),
    }),

    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: "auth/getall",
        method: "Get",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUserLoginMutation,
  useGetAllUsersQuery,
} = authapi;
