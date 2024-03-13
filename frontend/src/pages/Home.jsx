import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="homePage">
      <div className="links">
        <Link className="btn btn-link my-3 me-5" to="/recordings">
          Recordings
        </Link>
      </div>
      <div className="homePageTitle">
        <h3 className="mainTitle text-center">Pop Music Collection 2024</h3>
        <h5 className="mainSubtitle text-center">Version 5.0</h5>
      </div>
    </div>
  );
};

export default Home;
