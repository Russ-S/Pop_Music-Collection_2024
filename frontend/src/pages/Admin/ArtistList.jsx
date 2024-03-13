import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import PaginateArtists from "../../components/PaginateArtists";
import { toast } from "react-toastify";
import {
  useGetArtistsQuery,
  useDeleteArtistMutation,
} from "../../redux/api/artistsApiSlice";

const ArtistList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetArtistsQuery({
    pageNumber,
  });

  const [deleteArtist, { isLoading: loadingDelete }] =
    useDeleteArtistMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this artist?")) {
      try {
        await deleteArtist(id);
        toast.success("Artist deleted");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="propertyList">
      <Row className="align-items-center">
        <Col>
          <h1>Artists</h1>
        </Col>
        <Col className="text-end">
          <Link className="btn btn-dark my-3" to="/admin/addartist">
            <FaEdit /> Add Artist
          </Link>
        </Col>
      </Row>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table=sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.artists.map((artist) => (
                <tr key={artist._id}>
                  <td>{artist._id}</td>
                  <td>{artist.name}</td>
                  <td>
                    <LinkContainer to={`/admin/artist/${artist._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(artist._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateArtists pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};
export default ArtistList;
