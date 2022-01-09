import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelect } from "react-redux";
import { postStory } from "../../store/user/actions";
import Loading from "../../components/Loading";

export default function MyStoryForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function submitForm(e) {
    e.preventDefault();
    dispatch(postStory(name, content, imageUrl));
    setName("");
    setContent("");
    setImageUrl("");
  }
  // if (!name || !content || !imageUrl) {
  //   <Loading />;
  // }

  return (
    <Form as={Col} md={{ span: 6, offset: 3 }}>
      <h1 className="mt-5 mb-5">Post a cool story bro</h1>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name of your story."
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          value={content}
          onChange={(e) => setContent(e.target.value)}
          type="text"
          placeholder="Tell us what happened."
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          placeholder="A picture says more than 100 words."
        />
        {imageUrl ? (
          <Col className="mt-4" md={{ span: 8, offset: 2 }}>
            <Image src={imageUrl} alt="preview" thumbnail />
          </Col>
        ) : null}
      </Form.Group>
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitForm}>
          Post
        </Button>
      </Form.Group>
    </Form>
  );
}
