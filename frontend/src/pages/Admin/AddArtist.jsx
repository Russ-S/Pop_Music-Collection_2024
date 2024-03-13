import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useCreateArtistMutation } from "../../redux/api/artistsApiSlice";

const AddArtist = () => {
  const [name, setName] = useState("");
  const [createArtist] = useCreateArtistMutation();
  const navigate = useNavigate();

  const addArtistHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createArtist({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating artist failed, try again.");
    }
    navigate("/admin/artistlist");
  };

  return (
    <FormContainer>
      <div className="registerForm">
        <Link className="btn btn-secondary my-3" to="/admin/artistlist">
          Go Back
        </Link>

        <h1>Add Artist(s)</h1>

        <Form onSubmit={addArtistHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name(s)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" className="mt-2">
            Add Artist(s)
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};
export default AddArtist;
