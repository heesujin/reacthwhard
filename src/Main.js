import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadSnsFB } from "./redux/modules/sns";

function Main() {
  const dispatch = useDispatch();
  const sns_list = useSelector((state) => state.sns.list);
  // console.log(sns_list);
  // const user_list = useSelector((s) => s.users.list);
  // const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSnsFB());
  }, []);
  return (
    <div>
      <Upper>
        <Link to={"/"}>
          <Img src={require("./pngwing.com.png")} />
        </Link>

        <Signup>
          <Link to={"/signup"} style={{ textDecoration: "none" }}>
            <Text>Signup</Text>
          </Link>
        </Signup>
        <Login>
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Text>Login</Text>
          </Link>
        </Login>
      </Upper>
      {sns_list.map((value, index) => {
        const time = toString(value.time);
        return (
          <>
            <Down>
              <Pimg src={require("./Pooh.png")} />
              {/* {user_list.map((v, i) => { */}
              <Name>name</Name>
              {/* })} */}
              <Time>{value.time}</Time>
            </Down>
            {/* <Link to={"/Detial"} style={{ textDecoration: "none" }}> */}
            <Downs>
              <Nimg src={value.img} key={index} />
              <Texts>
                <Comments>{value.comments}</Comments>
              </Texts>
            </Downs>
            {/* </Link> */}
          </>
        );
      })}
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

const Down = styled.div`
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

const Downs = styled.div`
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

const Signup = styled.div`
  text-align: center;
  /* display: flex; */
  background-color: gray;
  color: white;
  width: 150px;
  height: 43px;
  border-radius: 5px;
  margin-left: 600px;
`;

const Login = styled.div`
  text-align: center;
  /* display: flex; */
  background-color: gray;
  color: white;
  width: 150px;
  height: 43px;
  border-radius: 5px;
  margin-left: 10px;
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

const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const Pimg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-top: 10px;
`;

const Nimg = styled.img`
  min-width: 450px;
  max-width: 450px;
  background-size: cover;
`;

const Name = styled.h3`
  margin-top: 30px;
  margin-left: 5px;
`;

const Time = styled.p`
  margin-top: 33px;
  margin-left: 700px;
`;

const Texts = styled.div`
  min-width: 450px;
  max-width: 450px;
  text-align: center;
  margin: auto;
`;

const Comments = styled.p`
  min-width: 450px;
  max-width: 450px;
  text-decoration: none;
  color: black;
`;

export default Main;
