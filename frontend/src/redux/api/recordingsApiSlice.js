import { RECORDINGS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const recordingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRecording: builder.mutation({
      query: (recording) => ({
        url: RECORDINGS_URL,
        method: "POST",
        body: { ...recording },
      }),
    }),
    getRecordings: builder.query({
      query: ({ pageNumber }) => ({
        url: RECORDINGS_URL,
        params: {
          pageNumber,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    // getRecordings: builder.query({
    //   query: ({ keyword }) => ({
    //     url: `${RECORDINGS_URL}`,
    //     params: { keyword },
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ["Recordings"],
    // }),
    getRecordingsSortList: builder.query({
      query: () => ({
        url: RECORDINGS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getRecordingDetail: builder.query({
      query: (recordingId) => ({
        url: `${RECORDINGS_URL}/${recordingId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateRecording: builder.mutation({
      query: (data) => ({
        url: `${RECORDINGS_URL}/${data.recordingId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Recordings"],
    }),
    deleteRecording: builder.mutation({
      query: (recordingId) => ({
        url: `${RECORDINGS_URL}/${recordingId}`,
        method: "DELETE",
      }),
    }),
    allRecordings: builder.query({
      query: () => `${RECORDINGS_URL}/allRecordings`,
    }),
    getFilteredRecordings: builder.query({
      query: ({ checked, radio }) => ({
        url: `${RECORDINGS_URL}/filtered-recordings`,
        method: "POST",
        body: { checked, radio },
      }),
    }),
  }),
});

export const {
  useCreateRecordingMutation,
  useGetRecordingsQuery,
  useGetRecordingsSortListQuery,
  useGetRecordingDetailQuery,
  useUpdateRecordingMutation,
  useDeleteRecordingMutation,
  useAllRecordingsQuery,
  useGetFilteredRecordingsQuery,
} = recordingsApiSlice;
