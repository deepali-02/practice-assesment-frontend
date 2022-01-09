import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
//import { selectLoggedInSpace } from "../../store/user/selectors";
import { selectUser } from "../../store/user/selectors";
import Loading from "../../components/Loading";
import { Button, Container, Card } from "react-bootstrap";

import MyStoryForm from "./MyStoryForm";
import { useState } from "react";
import Space from "../../components/Space";
import StoryCarousel from "../../components/StoryCarousel";
import EditSpaceForm from "./EditSpaceForm";

export default function MySpace() {
  const { token, space, id } = useSelector(selectUser);
  //const space1 = useSelector(selectLoggedInSpace);

  const [postStoryMode, setPostStoryMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  // console.log("User with space", space1);

  const navigate = useNavigate();

  if (token === null) {
    navigate("/");
  }
  if (space === null) {
    return <Loading />;
  }

  const displayButtons = id === space.userId;

  return (
    <>
      <Space
        id={space.id}
        title={space.title}
        description={space.description}
        backgroundColor={space.backgroundColor}
        color={space.color}
        showLink={false}
      />
      <Container>
        {displayButtons ? (
          <Card>
            <Button onClick={() => setEditMode(!editMode)} className="mt-2">
              {editMode ? "Close" : "Edit my space"}
            </Button>
            <Button
              onClick={() => setPostStoryMode(!postStoryMode)}
              className="mt-2"
            >
              {postStoryMode ? "Close" : "Post a cool story bro"}
            </Button>
          </Card>
        ) : null}

        {editMode &&(
          <Card>
            <EditSpaceForm/>
          </Card>
        )}

        {postStoryMode && (
          <Card>
            <MyStoryForm />
          </Card>
        )}

        <StoryCarousel owner space={space} />
      </Container>
    </>
  );
}
