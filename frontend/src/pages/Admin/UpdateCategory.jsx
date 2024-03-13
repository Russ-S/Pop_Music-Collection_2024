import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateCategoryMutation,
  useGetCategoryDetailsQuery,
} from "../../redux/api/categoriesApiSlice";

const UpdateCategory = () => {
  const { id: categoryId } = useParams();

  const [name, setName] = useState("");

  const {
    data: category,
    isLoading,
    error,
  } = useGetCategoryDetailsQuery(categoryId);

  const [updateCategory, { isLoading: loadingUpdate }] =
    useUpdateCategoryMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedCategory = {
      categoryId,
      name,
    };

    const result = await updateCategory(updatedCategory);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Category updated");
      navigate("/admin/categorylist");
    }
  };

  return (
    <div className="propertyList">
      <Link to="/admin/categorylist" className="btn btn-secondary my-2">
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Category</h1>
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
export default UpdateCategory;
