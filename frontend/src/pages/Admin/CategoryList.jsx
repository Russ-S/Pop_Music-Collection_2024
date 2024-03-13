import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import PaginateCategories from "../../components/PaginateCategories";
import { toast } from "react-toastify";
import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../redux/api/categoriesApiSlice";

const CategoryList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetCategoriesQuery({
    pageNumber,
  });

  const [deleteCategory, { isLoading: loadingDelete }] =
    useDeleteCategoryMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        toast.success("Category deleted");
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
          <h1>Categories</h1>
        </Col>
        <Col className="text-end">
          <Link className="btn btn-dark my-3" to="/admin/addcategory">
            <FaEdit /> Add Category
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
              {data.categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>
                    <LinkContainer to={`/admin/category/${category._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(category._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateCategories
            pages={data.pages}
            page={data.page}
            isAdmin={true}
          />
        </>
      )}
    </div>
  );
};
export default CategoryList;
