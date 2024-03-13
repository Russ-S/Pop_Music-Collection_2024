import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Message from "../../components/Message";
// import Loader from "../../components/Loader";
// import PaginateRecordings from "../../components/PaginateRecordings";
import { useFetchMediaQuery } from "../../redux/api/mediaApiSlice";
import ReactPaginate from "react-paginate";

import { useGetFilteredRecordingsQuery } from "../../redux/api/recordingsApiSlice";

import {
  setMedia,
  setRecordings,
  setChecked,
} from "../../redux/recordings/recordingSlice";

import RecordingCard from "./RecordingCard";
import RecordingSearchForm from "../../components/RecordingSearchForm";

const Recordings = () => {
  const dispatch = useDispatch();

  const { media, recordings, checked, radio } = useSelector(
    (state) => state.recordings
  );

  // const { pageNumber } = useParams();

  const mediaQuery = useFetchMediaQuery();

  const filteredRecordingsQuery = useGetFilteredRecordingsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!mediaQuery.isLoading) {
      dispatch(setMedia(mediaQuery.data));
    }
    // eslint-disable-next-line
  }, [mediaQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredRecordingsQuery.isLoading) {
        // Filter recordings based on checked media
        const filteredMedia = filteredRecordingsQuery.data.filter(
          (recording) => {
            return recording.media;
          }
        );

        dispatch(setRecordings(filteredMedia));
      }
    }
    // eslint-disable-next-line
  }, [checked, radio, filteredRecordingsQuery.data, dispatch]);

  // const { data, isLoading, error } = useGetRecordingsQuery({
  //   pageNumber,
  // });

  const handleCategoryClick = (category) => {
    const recordingsByCategory = filteredRecordingsQuery.data?.filter(
      (recording) => recording.category === category
    );

    dispatch(setRecordings(recordingsByCategory));
  };

  const handleCheck = (value, name) => {
    const updatedChecked = value
      ? [...checked, name]
      : checked.filter((m) => m !== name);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Categories" option to uniqueCategories
  const uniqueCategories = [
    ...Array.from(
      new Set(
        filteredRecordingsQuery.data
          ?.map((recording) => recording.category)
          .filter((category) => category !== undefined)
      )
    ),
  ].sort();

  // for pagination
  const [pageNumber, setPageNumber] = useState(0);
  const recordingsPerPage = 18;
  const pagesVisited = pageNumber * recordingsPerPage;

  const pageCount = Math.ceil(recordings.length / recordingsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="row">
      <div className="sidebar">
        <h6 className="fw-semibold">Filter By Media</h6>

        <div className="pl-5 mb-4">
          {media?.map((m) => (
            <div key={m._id} className="ms-3 mb-2 text-white">
              <div className="flex items-center mr-4">
                <input
                  type="checkbox"
                  id="red-checkbox"
                  onChange={(e) => handleCheck(e.target.checked, m.name)}
                  className="pl-5"
                />

                <label
                  htmlFor="pink-checkbox"
                  className="ms-2 text-sm font-medium text-white"
                >
                  {m.name}
                </label>
              </div>
            </div>
          ))}
        </div>

        <h6 className="fw-semibold">Filter By Category</h6>

        <div className="ml-5 mb-4">
          {uniqueCategories?.map((category, index) => (
            <>
              <div className="flex items-center ms-3 mb-1">
                <input
                  key={index}
                  type="radio"
                  id={category}
                  name="brand"
                  onChange={() => handleCategoryClick(category)}
                  className="pl-5"
                />
                <label htmlFor="pink-radio" className="ms-2">
                  {category}
                </label>
              </div>
            </>
          ))}
        </div>
        <div className="d-grid gap-2">
          <button
            className="btn btn-primary fw-bold"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
      </div>

      {/* <div className="recordingList">
          <h4>{recordings?.length} Recordings</h4>

          <div className="card-container">
            {recordings.length === 0 ? (
              <h3>>No reordingses found</h3>
            ) : (
              movies
                .slice(pagesVisited, pagesVisited + moviesPerPage)
                .map((movie) => (
                  <div key={movie._id}>
                    <MovieCard movie={movie} />
                  </div>
                ))
            )}
          </div> */}
      {/* <div className="recordingList">
        <div className="row d-flex pb-3">
          <div className="col-lg-6 col-md-12">
            <h4>{data?.recordings?.length} Recordings</h4>
          </div>
          <div className="col-lg-6 col-md-12">
            <RecordingSearchForm />
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <div className="card-container">
              {data.recordings.map((r) => (
                <div key={r._id}>
                  <RecordingCard r={r} />
                </div>
              ))}
            </div>
          </>
        )}
      </div> */}
      <div className="recordingList">
        <div className="row d-flex pb-3">
          <div className="col-lg-6 col-md-12">
            <h4>{recordings?.length} Recordings</h4>
          </div>
          <div className="col-lg-6 col-md-12">
            <RecordingSearchForm />
          </div>
        </div>

        <div className="card-container">
          {recordings.length === 0 ? (
            <h3>No recordings found</h3>
          ) : (
            recordings
              ?.slice(pagesVisited, pagesVisited + recordingsPerPage)
              .map((r) => (
                <div key={r._id}>
                  <RecordingCard r={r} />
                </div>
              ))
          )}
        </div>

        <ReactPaginate
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
};
export default Recordings;
