import React from "react";
import Modify from "./Modify";
import Main from "./Main";
import Login from "./Login";
import Signup from "./Singup";
import Add from "./Add";
import YesLogin from "./YesLogin";
import Detail from "./Detail";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./shared/firebase";
import { db } from "./shared/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loadSnsFB } from "./redux/modules/sns";

function App() {
  const dispatch = useDispatch();
  const [is_login, setIsLogin] = React.useState(false);

  React.useEffect(() => {
    dispatch(loadSnsFB());
  }, []);

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  });

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  return (
    <div>
      <Routes>
        {is_login ? (
          <Route path="/" element={<YesLogin />} />
        ) : (
          <Route path="/" element={<Main />} />
        )}
        <Route path="/add" element={<Add />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/modify/:index" element={<Modify />} />
        <Route path="/detail/:index" element={<Detail />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
