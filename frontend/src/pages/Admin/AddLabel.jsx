import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useCreateLabelMutation } from "../../redux/api/labelsApiSlice";

const AddLabel = () => {
  const [name, setName] = useState("");
  const [createLabel] = useCreateLabelMutation();
  const navigate = useNavigate();

  const addLabelHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Label name is required");
      return;
    }

    try {
      const result = await createLabel({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating label failed, try again.");
    }
    navigate("/admin/labellist");
  };

  return (
    <FormContainer>
      <div className="registerForm">
        <Link className="btn btn-secondary my-3" to="/admin/labellist">
          Go Back
        </Link>

        <h1>Add Label</h1>

        <Form onSubmit={addLabelHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="dark" className="mt-2">
            Add Label
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};
export default AddLabel;
