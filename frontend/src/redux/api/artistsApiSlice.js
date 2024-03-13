import { apiSlice } from "./apiSlice";
import { ARTISTS_URL } from "../constants";

export const ArtistsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createArtist: builder.mutation({
      query: (data) => ({
        url: `${ARTISTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getArtists: builder.query({
      query: ({ pageNumber }) => ({
        url: ARTISTS_URL,
        params: {
          pageNumber,
        },
      }),
      providesTags: ["Artist"],
      keepUnusedDataFor: 5,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => ({
        url: `${ARTISTS_URL}/${artistId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateArtist: builder.mutation({
      query: (data) => ({
        url: `${ARTISTS_URL}/${data.artistId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Artists"],
    }),
    deleteArtist: builder.mutation({
      query: (artistId) => ({
        url: `${ARTISTS_URL}/${artistId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateArtistMutation,
  useGetArtistsQuery,
  useGetArtistDetailsQuery,
  useUpdateArtistMutation,
  useDeleteArtistMutation,
} = ArtistsApiSlice;
