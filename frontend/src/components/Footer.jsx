import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: "#3c4c5d", color: "white" }}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>
              &copy; 2010 - {currentYear} &#8212; Russ Sweezey. HES Web Design.
              All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
