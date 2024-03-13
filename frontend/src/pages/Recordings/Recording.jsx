import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup } from "react-bootstrap";
import axios from "axios";

const Recording = () => {
  const [recording, setRecording] = useState({});

  const { id: recordingId } = useParams();

  useEffect(() => {
    const fetchRecording = async () => {
      const { data } = await axios.get(`/api/recordings/${recordingId}`);
      setRecording(data);
    };

    fetchRecording();
  }, [recordingId]);

  return (
    <div className="recordingDetail">
      <Link className="btn btn-secondary my-3" to="/recordings">
        Go Back
      </Link>

      <>
        <Row>
          <Col lg={3} md={12} className="text-center">
            <Image
              src={`/covers/${recording.coverImage}`}
              alt={recording.title}
              fluid
              style={{
                border: "1px solid #000",
                width: "300px",
                height: "300px",
              }}
              className="mt-0"
            />
          </Col>
          <Col md={9}>
            <div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3 className="fw-bold">{recording.artist_name}</h3>
                  <h4 className="fw-semibold">{recording.title}</h4>
                  <h4>{recording.category}</h4>
                </ListGroup.Item>
              </ListGroup>
            </div>

            <div>
              <Row>
                <Col md={6}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h6>
                        <strong>Label: </strong> {recording.label}
                      </h6>
                      <h6>
                        <strong>Number: </strong> {recording.number}
                      </h6>
                      <h6>
                        <strong>Number in Set: </strong>{" "}
                        {recording.number_in_set}
                      </h6>
                      <h6>
                        <strong>Tracks: </strong> {recording.num_tracks}
                      </h6>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                <Col md={6}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h6>
                        <strong>Year: </strong> {recording.year}
                      </h6>
                      <h6>
                        <strong>Media: </strong> {recording.media}
                      </h6>
                      <h6>
                        <strong>Value: </strong> ${recording.value}
                      </h6>
                      <h6>
                        <strong>Location: </strong> {recording.location}
                      </h6>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </>
    </div>
  );
};
export default Recording;
