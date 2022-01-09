import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
//import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

import { fetchSpaces } from "../store/spaces/action";
import { selectSpace } from "../store/spaces/selector";
import Space from "../components/Space";

export default function Spaces() {
  const dispatch = useDispatch();
  const spaces = useSelector(selectSpace);
  

  useEffect(() => {
    dispatch(fetchSpaces);
  }, [dispatch]);

  return (
    //<h1>Hello</h1>
    <>
      <Jumbotron>
        <h1>Spaces</h1>
      </Jumbotron>
      <Container>
        {spaces.map((s) => {
          return (
            <Space
              Key={s.id}
              id={s.id}
              title={s.title}
              description={s.description}
              backgroundColor={s.backgroundColor}
              color={s.color}
              showLink={true}
            />
          );
        })}
      </Container>
    </>
  );
}
