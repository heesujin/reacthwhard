import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { auth, db, storage } from "./shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addSnsFB } from "./redux/modules/sns";

function Add() {
  const file_link_ref = React.useRef(null);
  const comment_ref = React.useRef(null);

  const dispatch = useDispatch();
  const date = new Date().toString().split(" ");
  const days = date.reverse().join(" ");
  const time = days.slice(18, 26);
  const day = days.slice(27);
  const now = day + " " + time;
  const [link, setLink] = useState("");

  const selectFile = async (e) => {
    const upload = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );
    console.log(upload);

    const file_url = await getDownloadURL(upload.ref);

    console.log(file_url);
    setLink(file_url);
  };

  // const uploadFB = () => {
  //   let image = file_link_ref.current?.files[0];
  //   const _upload = storage.ref(`images/${image.name}`).put(image);

  //   //   업로드!
  //   _upload.then((snapshot) => {
  //     console.log(snapshot);

  //     // 업로드한 파일의 다운로드 경로를 가져오자!
  //     snapshot.ref.getDownloadURL().then((url) => {
  //       console.log(url);
  //     });
  //   });
  // };

  const addSns = () => {
    const comment = comment_ref.current;

    console.log({
      img: link,
      comments: comment.value,
    });

    dispatch(
      addSnsFB({
        img: link,
        comments: comment.value,
        time: now,
      })
    );
  };

  return (
    <div>
      <Upper>
        <Link to={"/"}>
          <Img src={require("./pngwing.com.png")} />
        </Link>
      </Upper>
      <All>
        <Title>새 게시물 추가</Title>
        <Stitle>IMAGE</Stitle>{" "}
        <Input ref={file_link_ref} type="file" onChange={selectFile} />
        <br />
        <Stitle>COMMENTS</Stitle> <Input type="textarea" ref={comment_ref} />{" "}
        <br />
        <Link to={"/"}>
          <Btn onClick={addSns}>올리기</Btn>
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
