import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import PaginateLabels from "../../components/PaginateLabels";
import { toast } from "react-toastify";
import {
  useGetLabelsQuery,
  useDeleteLabelMutation,
} from "../../redux/api/labelsApiSlice";

const LabelList = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetLabelsQuery({ pageNumber });

  const [deleteLabel, { isLoading: loadingDelete }] = useDeleteLabelMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this label?")) {
      try {
        await deleteLabel(id);
        toast.success("Label deleted");
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
          <h1>Labels</h1>
        </Col>
        <Col className="text-end">
          <Link className="btn btn-dark my-3" to="/admin/addlabel">
            <FaEdit /> Add Label
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
              {data.labels.map((label) => (
                <tr key={label._id}>
                  <td>{label._id}</td>
                  <td>{label.name}</td>
                  <td>
                    <LinkContainer to={`/admin/label/${label._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(label._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginateLabels pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};
export default LabelList;
