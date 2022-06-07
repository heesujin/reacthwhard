import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { auth, db, storage } from "./shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateSnsFB } from "./redux/modules/sns";
import { useDispatch, useSelector } from "react-redux";

function Add() {
  const file_link_ref = React.useRef(null);
  const comment_ref = React.useRef(null);
  const dispatch = useDispatch();
  const params = useParams();
  const sns_list = useSelector((state) => state.sns.list);
  const sns_index = params.index;
  const sns = sns_list.filter((value) => value.id === sns_index)[0];
  const [link, setLink] = React.useState("");

  const selectFile = async (e) => {
    const upload = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    // console.log(upload);

    const file_url = await getDownloadURL(upload.ref);

    // console.log(file_url);
    setLink(file_url);
  };

  const updateSns = () => {
    dispatch(
      updateSnsFB({
        index: sns_index,
        img: link,
        comments: comment_ref.current.value,
      })
    );
  };

  // console.log(updateSnsFB);

  return (
    <div>
      <Upper>
        <Link to={"/"}>
          <Img src={require("./pngwing.com.png")} />
        </Link>
      </Upper>
      <All>
        <Title>수정하기</Title>
        <Stitle>IMAGE</Stitle>
        <Input type="file" ref={file_link_ref} onChange={selectFile} />
        <br />
        <Stitle>COMMENTS</Stitle> <Input type="textarea" ref={comment_ref} />
        <br />
        <Link to={"/"}>
          <Btn onClick={updateSns}>수정하기</Btn>
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

export default Add;
