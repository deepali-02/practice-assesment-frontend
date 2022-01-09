import React, { useEffect } from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Spaces from "./pages/Spaces";
import DetailSpace from "./pages/DetailSpace";
import MySpace from "./pages/MySpace/MySpace";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Jumbotron } from "react-bootstrap";

/*const Home = () => (
  <Jumbotron>
    <h1>Home</h1>
  </Jumbotron>
);
const Other = () => (
  <Jumbotron>
    <h2>In Other</h2>
  </Jumbotron>
);*/

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<Spaces />} />
        <Route path="/spaces/:id" element={<DetailSpace />} />
        <Route path="/mySpace" element={<MySpace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
