import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useCreateCategoryMutation } from "../../redux/api/categoriesApiSlice";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [createCategory] = useCreateCategoryMutation();
  const navigate = useNavigate();

  const addCategoryHandler = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Category name is required");
      return;
    }

    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
    navigate("/admin/categorylist");
  };

  return (
    <FormContainer>
      <div className="registerForm">
        <Link className="btn btn-secondary my-3" to="/admin/categorylist">
          Go Back
        </Link>

        <h1>Add Category</h1>

        <Form onSubmit={addCategoryHandler}>
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
            Add Category
          </Button>
        </Form>
      </div>
    </FormContainer>
  );
};
export default AddCategory;
