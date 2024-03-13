import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginateLabels = ({ pages, page, isAdmin = true }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={`/admin/labellist/${x + 1}`}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};
export default PaginateLabels;
