import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./shared/firebase";
import { loadSnsFB, deleteSnsFB } from "./redux/modules/sns";
import { useSelector, useDispatch } from "react-redux";

function Detail() {
  const dispatch = useDispatch();
  const sns_list = useSelector((state) => state.sns.list);
  const params = useParams();
  const sns_index = params.index;
  const sns = sns_list.filter((index) => {
    // console.log(index);
    if (sns_index === index.id) {
      return true;
    } else {
      return false;
    }
  });
  //   console.log(sns);

  //   console.log(sns_index);
  //   console.log(sns_list);

  useEffect(() => {
    // console.log(loadSnsFB);
    dispatch(loadSnsFB());
  }, []);

  return (
    <div>
      <Upper>
        <Link to={"/"}>
          <Img src={require("./pngwing.com.png")} />
        </Link>
        <My>
          <Pimg src={require("./Pooh.png")} />
          <Name>name</Name>
        </My>

        <Signup>
          <Link to={"/add"} style={{ textDecoration: "none" }}>
            <Text>new</Text>
          </Link>
        </Signup>

        <Login>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Text
              onClick={() => {
                signOut(auth);
              }}
            >
              Logout
            </Text>
          </Link>
        </Login>
      </Upper>

      <Down>
        <Pimg src={require("./Pooh.png")} />
        <Name>name</Name>
        <Time>{sns[0].time}</Time>
        <Link to={"/modify/" + sns_index} style={{ textDecoration: "none" }}>
          <Btn>Modify</Btn>
        </Link>
        <Btn
          onClick={() => {
            dispatch(deleteSnsFB(sns[0].id));
          }}
        >
          Delete
        </Btn>
      </Down>

      <Downs>
        <Nimg src={sns[0].img} />
        <Texts>
          <Comments>{sns[0].comments}</Comments>
        </Texts>
      </Downs>
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

// const Add = styled.div`
//   background-color: #fade7d;
//   width: 70px;
//   height: 70px;
//   text-align: center;
//   right: 10px;
//   top: 10px;
//   line-height: 53px;
//   border-radius: 50px;
//   font-size: 70px;
//   color: white;
//   position: fixed;
// `;

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
const My = styled.div`
  margin-top: -10px;
  display: flex;
  margin-left: 500px;
  margin-top: -20px;
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
  margin-left: 20px;
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
  margin-top: 28px;
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
`;

const Btn = styled.button`
  height: 30px;
  margin-top: 35px;
  margin-left: 5px;
  background-color: gray;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  border: none;
`;

export default Detail;
