import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const PaginateCategories = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={`/admin/categorylist/${x + 1}`}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};
export default PaginateCategories;
