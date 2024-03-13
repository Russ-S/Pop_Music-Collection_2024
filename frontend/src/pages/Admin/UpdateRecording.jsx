import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {
  useGetRecordingDetailQuery,
  useUpdateRecordingMutation,
} from "../../redux/api/recordingsApiSlice";
import axios from "axios";

const UpdateRecording = () => {
  const { id: recordingId } = useParams();

  // Select fields data
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);

  // Field values
  const [artist_name, setArtist_Name] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [label, setLabel] = useState("");
  const [number, setNumber] = useState("");
  const [year, setYear] = useState("");
  const [media, setMedia] = useState();
  const [number_in_set, setNumber_in_set] = useState("");
  const [value, setValue] = useState("");
  const [num_tracks, setNum_tracks] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await axios.get("/api/artists/formlist");
      setArtists(res.data);
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/api/categories/formlist");
      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchLabels = async () => {
      const res = await axios.get("/api/labels/formlist");
      setLabels(res.data);
    };

    fetchLabels();
  }, []);

  const {
    data: recording,
    isLoading,
    error,
  } = useGetRecordingDetailQuery(recordingId);

  const [updateRecording, { isLoading: loadingUpdate }] =
    useUpdateRecordingMutation();

  useEffect(() => {
    if (recording) {
      setArtist_Name(recording.artist_name);
      setCoverImage(recording.coverImage);
      setTitle(recording.title);
      setCategory(recording.category);
      setLabel(recording.label);
      setNumber(recording.number);
      setYear(recording.year);
      setMedia(recording.media);
      setNumber_in_set(recording.number_in_set);
      setValue(recording.value);
      setNum_tracks(recording.num_tracks);
      setLocation(recording.location);
    }
  }, [recording]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedRecording = {
      recordingId,
      artist_name,
      coverImage,
      title,
      category,
      label,
      number,
      year,
      media,
      number_in_set,
      value,
      num_tracks,
      location,
    };

    const result = await updateRecording(updatedRecording);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Recording updated");
      navigate("/admin/recordinglist");
    }
  };

  return (
    <div className="propertyList">
      <Link to="/admin/recordinglist" className="btn btn-secondary my-2">
        Go Back
      </Link>

      <h4>Update Recording</h4>
      {loadingUpdate && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6} sm={12}>
              <Form.Group controlId="composer" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Artist(s):</Form.Label>
                  <Form.Select
                    type="text"
                    placeholder="Select artist(s)"
                    required
                    value={artist_name}
                    onChange={(e) => setArtist_Name(e.target.value)}
                  >
                    <option>Select Artist(s)</option>
                    {artists.map((artist) => (
                      <option key={artist._id} value={artist.name}>
                        {artist.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>
            <Col md={6} sm={12}>
              <Form.Group controlId="coverImage" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Cover Image:</Form.Label>
                  <Form.Control
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={9} sm={12}>
              <Form.Group controlId="composition" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Title:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={3} sm={6}>
              <Form.Group controlId="category" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Category:</Form.Label>
                  <Form.Select
                    type="text"
                    placeholder="Select category"
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={1} sm={6}>
              <Form.Group controlId="year" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Year Recorded:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter year"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={2} sm={6}>
              <Form.Group controlId="media" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Media:</Form.Label>
                  <Form.Select
                    type="text"
                    placeholder="Select media type"
                    required
                    value={media}
                    onChange={(e) => setMedia(e.target.value)}
                  >
                    <option>Select Media Type</option>
                    <option value="Compact Disc">Compact Disc</option>
                    <option value="CD-Recordable">CD-Recordable</option>
                    <option value="Cassette">Cassette</option>
                    <option value="LP Album">LP Album</option>
                    <option value="Reel to Reel Tape">Reel to Reel Tape</option>
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>

            <Col md={1} sm={6}>
              <Form.Group controlId="value" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Value:</Form.Label>$
                  <Form.Control
                    type="text"
                    placeholder="Enter value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={1} sm={6}>
              <Form.Group controlId="number_in_set" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Number in Set:</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter # in set"
                    value={number_in_set}
                    onChange={(e) => setNumber_in_set(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={1} sm={3}>
              <Form.Group controlId="year" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName"># of Tracks:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter # of tracks"
                    required
                    value={num_tracks}
                    onChange={(e) => setNum_tracks(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>

            <Col md={3} sm={6}>
              <Form.Group controlId="label" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Label:</Form.Label>
                  <Form.Select
                    type="text"
                    placeholder="Select label"
                    required
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                  >
                    <option>Select Label</option>
                    {labels.map((label) => (
                      <option key={label._id} value={label.name}>
                        {label.name}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>

            <Col md={3} sm={6}>
              <Form.Group controlId="catalogNumber" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Catalog No.:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter catalog number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  ></Form.Control>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Form.Group controlId="location" className="my-2">
                <div className="formRow">
                  <Form.Label className="labelName">Location:</Form.Label>
                  <Form.Select
                    type="text"
                    placeholder="Select location"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option>Select Location</option>
                    <option value="Cortez, CO">Cortez, CO</option>
                    <option value="Fallston, MD">Fallston, MD</option>
                  </Form.Select>
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="dark" className="my-2">
            Update Recording
          </Button>
        </Form>
      )}
    </div>
  );
};

export default UpdateRecording;
