import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({name}) => ({
        url: `${CATEGORY_URL}`,
        method: "POST",
        body:{ name},
      }),
      invalidatesTags: ["Category"],
    }),

    updateCategory: builder.mutation({
      query: ({ category_id, ...updateCategory }) => ({
        url: `${CATEGORY_URL}/${category_id}`,
        method: "PUT",
        body: updateCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation({
      query: ({ category_id }) => ({
        url: `${CATEGORY_URL}/${category_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getCategory: builder.query({
      query: ({ category_id }) => ({
        url: `${CATEGORY_URL}/${category_id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryQuery,
} = categoryApiSlice;
