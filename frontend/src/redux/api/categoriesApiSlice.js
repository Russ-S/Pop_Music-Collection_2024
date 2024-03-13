import { apiSlice } from "./apiSlice";
import { CATEGORIES_URL } from "../constants";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (category) => ({
        url: CATEGORIES_URL,
        method: "POST",
        body: { ...category },
      }),
    }),
    getCategories: builder.query({
      query: ({ pageNumber }) => ({
        url: CATEGORIES_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    fetchCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
      }),
      providesTags: ["Category"],
      keepUnusedDataFor: 5,
    }),
    getCategoryDetails: builder.query({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}/${data.categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORIES_URL}/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useFetchCategoriesQuery,
  useGetCategoryDetailsQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
