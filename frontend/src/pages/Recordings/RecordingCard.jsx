import { Link } from "react-router-dom";
import "./RecordingCard.css";

const RecordingCard = ({ r }) => {
  return (
    <Link to={`/recording/${r._id}`}>
      <section className="card shadow-lg">
        <div className="card-details">
          <section className="card-image text-center">
            <img src={`/covers/${r.coverImage}`} alt="album cover" />
          </section>
          <section className="cardArtist">{r.artist_name}</section>
          <section className="cardTitle">{r.title}</section>
        </div>
        <div className="cardFooter">
          <div className="bg-warning d-flex justify-content-between px-2">
            <span className="pull-left">
              <strong>{r.media}</strong>
            </span>
            <span className="pull-right">
              <strong>{r.category}</strong>
            </span>
          </div>
        </div>
      </section>
    </Link>
  );
};
export default RecordingCard;
