import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../authapi/basequery";

export interface Book {
  _id: string;
  user: string;
  title: string;
  author: string;
  deleted: boolean;
  __v: number;
}

export const bookcurdapi = createApi({
  reducerPath: "bookApi",
  tagTypes: ["Book"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    //add book
    addbook: builder.mutation({
      query: (book) => ({
        url: "book/add",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),

    //delete book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `book/softdelete/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Book"],
    }),

    //update book
    updateBook: builder.mutation({
      query: ({ id, book }) => ({
        url: `book/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),

    // getall books
    getallBooks: builder.query<Book[], void>({
      query: () => ({
        url: `book/findall`,
        method: "GET",
      }),
      providesTags: ["Book"],
    }),
  }),
});

export const {
  useAddbookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useGetallBooksQuery,
} = bookcurdapi;
