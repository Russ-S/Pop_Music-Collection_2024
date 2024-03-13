import { apiSlice } from "./apiSlice";
import { LABELS_URL } from "../constants";

export const labelsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLabel: builder.mutation({
      query: (label) => ({
        url: LABELS_URL,
        method: "POST",
        body: { ...label },
      }),
    }),
    getLabels: builder.query({
      query: ({ pageNumber }) => ({
        url: LABELS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Label"],
      keepUnusedDataFor: 5,
    }),
    getLabelDetails: builder.query({
      query: (labelId) => ({
        url: `${LABELS_URL}/${labelId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateLabel: builder.mutation({
      query: (data) => ({
        url: `${LABELS_URL}/${data.labelId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Labels"],
    }),
    deleteLabel: builder.mutation({
      query: (labelId) => ({
        url: `${LABELS_URL}/${labelId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateLabelMutation,
  useGetLabelsQuery,
  useGetLabelDetailsQuery,
  useUpdateLabelMutation,
  useDeleteLabelMutation,
} = labelsApiSlice;
