// const RecordingSearchForm = () => {
//   return <div>RecordingSearchForm</div>;
// };
// export default RecordingSearchForm;
// const MovieSearchForm = () => {
//   return (
//     <div>
//       <h1 className="text-white">MovieSearchForm</h1>
//     </div>
//   );
// };
// export default MovieSearchForm;
import { useState, useEffect } from "react";

import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const RecordingSearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-grow-1 px-3 searchForm"
      >
        <input
          type="text"
          placeholder="Search recordings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
      </form>
    </>
  );
};
export default RecordingSearchForm;
