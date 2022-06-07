import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth, db } from "./shared/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDoc, where, query, collection } from "firebase/firestore";

function Login() {
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  const loginFB = async () => {
    const user = await signInWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );

    const user_docs = await getDoc(
      query(collection(db, "users"), where("user_id", "==", user.user.email))
    );
    user_docs.forEach((u) => {
      console.log(u.data());
    });
  };

  return (
    <div>
      <Upper>
        <Link to={"/"}>
          <Img src={require("./pngwing.com.png")} />
        </Link>

        <Sign>
          <Link to={"/add"} style={{ textDecoration: "none" }}>
            <Text>회원가입</Text>
          </Link>
        </Sign>
      </Upper>
      <All>
        <Title>로그인</Title>
        <Stitle>EMAIL</Stitle>
        <Input ref={id_ref} placeholder="이메일을 작성해주세요" />
        <br />
        <Stitle>PASSWORD</Stitle>
        <Input ref={pw_ref} placeholder="비밀번호를 작성해주세요" /> <br />
        <Link to={"/"}>
          <Btn onClick={loginFB}>로그인</Btn>
        </Link>
      </All>
    </div>
  );
}

const Upper = styled.div`
  background: ${(props) => props.color || "transform"};
  padding: 1rem;
  display: flex;

  width: 1024px; //default설정
  margin: 0 auto; //가운데정렬

  @media (max-width: 1024px) {
    //769px~1024px
    width: 768px;
  }
  @media (max-width: 768px) {
    //~768px
    width: 100%;
  }
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const Sign = styled.div`
  text-align: center;
  /* display: flex; */
  background-color: gray;
  color: white;
  width: 150px;
  height: 43px;
  border-radius: 5px;
  margin-left: 800px;
`;

const Text = styled.p`
  margin-top: 8px;
  padding-left: 13;
  text-decoration: none;
  color: white;
  &:hover {
    color: black;
  }
`;

const All = styled.div`
  background: ${(props) => props.color || "transform"};
  padding: 1rem;
  display: flex;

  width: 1024px; //default설정
  margin: 0 auto; //가운데정렬

  flex-direction: column;
  border: 2px solid #aeaeae;
  border-radius: 5px;

  padding: 20px;
  @media (max-width: 1024px) {
    //769px~1024px
    width: 768px;
  }
  @media (max-width: 768px) {
    //~768px
    width: 100%;
  }
`;

const Title = styled.h1`
  text-align: center;
`;

const Stitle = styled.h3`
  margin: 10px 20px;
`;
const Input = styled.input`
  padding: 10px;
  margin: auto 20px;
`;

const Btn = styled.button`
  margin: 10px 20px;
  padding: 10px;
`;

export default Login;
