import { Link } from "react-router-dom";

const RecordingItem = ({ recording }) => {
  return (
    <div className="searchResultCard shadow-lg">
      <Link to={`/recording/${recording._id}`}>
        <div className="text-center">
          <img
            src={`/covers/${recording.coverImage}` || "/covers/no-image.jpg"}
            alt="album cover"
            style={{
              width: "100px",
              height: "100px",
              border: "1px solid #000",
            }}
          />
        </div>

        <div className="mt-2">
          <p>
            <span className="fw-bold">{recording.artist_name}</span>
            <br />
            <span className="fw-bold">{recording.title}</span>
            <br />
          </p>
        </div>
        <div className="cardFooter">
          <div className="d-flex bg-warning justify-content-between px-2">
            <p className="fw-bold">{recording.media}</p>
            <p className="fw-bold">{recording.category}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default RecordingItem;
