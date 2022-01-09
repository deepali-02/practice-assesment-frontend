import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectMySpace } from "../../store/user/selectors";
import { updateSpace } from "../../store/user/actions";

export default function EditSpaceForm() {
  const dispatch = useDispatch();
  const space = useSelector(selectMySpace);
  const [title, setTitle] = useState(space.title);
  const [description, setDescription] = useState(space.description);
  const [backgroundColor, setBackgroundColor] = useState(space.backgroundColor);
  const [color, setColor] = useState(space.color);

  function submitEditForm(e) {
    e.preventDefault();
    dispatch(updateSpace(title, description, backgroundColor, color));
  }
  return (
    <Form as={Col} md={{ span: 6, offset: 3 }}>
      <h1 className="mt-5 mb-5">Edit your Space</h1>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Name of the space"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="What is this space about"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Background Color</Form.Label>
        <Form.Control
          value={backgroundColor}
          onChange={(e) => setBackgroundColor(e.target.value)}
          type="color"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Text Color</Form.Label>
        <Form.Control
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="color"
        />
      </Form.Group>
      <Form.Group className="mt-5">
        <Button variant="primary" type="submit" onClick={submitEditForm}>
          Post
        </Button>
      </Form.Group>
    </Form>
  );
}
