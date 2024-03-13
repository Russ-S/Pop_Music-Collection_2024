import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateArtistMutation,
  useGetArtistDetailsQuery,
} from "../../redux/api/artistsApiSlice";

const UpdateArtist = () => {
  const { id: artistId } = useParams();

  const [name, setName] = useState("");

  const { data: artist, isLoading, error } = useGetArtistDetailsQuery(artistId);

  const [updateArtist, { isLoading: loadingUpdate }] =
    useUpdateArtistMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (artist) {
      setName(artist.name);
    }
  }, [artist]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedArtist = {
      artistId,
      name,
    };

    const result = await updateArtist(updatedArtist);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Artist updated");
      navigate("/admin/artistlist");
    }
  };

  return (
    <div className="propertyList">
      <Link to="/admin/artistlist" className="btn btn-secondary my-2">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Artist(s)</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="dark" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};
export default UpdateArtist;
