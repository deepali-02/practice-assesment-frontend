import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router";
import { selectOneSpace } from "../store/spaces/selector";
import Loading from "../components/Loading"

import { fetchSpaceDetail } from "../store/spaces/action";
import Space from "../components/Space";
import StoryCarousel from "../components/StoryCarousel";

export default function DetailSpace() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const space = useSelector(selectOneSpace);

  console.log("oneSpace from selector: ", space);

  useEffect(() => {
    dispatch(fetchSpaceDetail(id));
  }, [dispatch, id]);

  // return (
  //   //<div>Space Detail</div>
  //   <div>
  //     {!oneSpace ? (
  //       "Loading"
  //     ) : (
  //       <div>
  //         <h1>{oneSpace.title}</h1>
  //         <p>{oneSpace.description}</p>
  //         <div>
  //           {oneSpace.stories.map((story) => {
  //             return (
  //               <div className="onespace">
  //                 <h3>{story.name}</h3>
  //                 <p>{story.content}</p>
  //                 <p>
  //                   <img src={story.imageUrl} alt="" />
  //                 </p>
  //               </div>
  //             );
  //           })}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
  if (!space || parseInt(space.id) !== parseInt(id)) return <Loading />;
  return (
    //<div>Hello</div>
    <>
      <Space
        id={space.id}
        title={space.title}
        description={space.description}
        backgroundCorlor={space.backgroundCorlor}
        color={space.color}
        showLink={false}
      />
      <Container>
        <StoryCarousel space={space} />
      </Container>
    </>
  );
}
