import { apiSlice } from "./apiSlice";
import { MEDIA_URL } from "../constants";

export const mediaApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMedia: builder.mutation({
      query: (media) => ({
        url: MEDIA_URL,
        method: "POST",
        body: { ...media },
      }),
    }),
    fetchMedia: builder.query({
      query: () => `${MEDIA_URL}`,
    }),
    getMedia: builder.query({
      query: () => ({
        url: MEDIA_URL,
      }),
      providesTags: ["Media"],
      keepUnusedDataFor: 5,
    }),
    getMediaDetails: builder.query({
      query: (mediaId) => ({
        url: `${MEDIA_URL}/${mediaId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateMedia: builder.mutation({
      query: (data) => ({
        url: `${MEDIA_URL}/${data.mediaId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Labels"],
    }),
    deleteMedia: builder.mutation({
      query: (mediaId) => ({
        url: `${MEDIA_URL}/${mediaId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateMediaMutation,
  useFetchMediaQuery,
  useGetMediaQuery,
  useGetMediaDetailsQuery,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = mediaApiSlice;
