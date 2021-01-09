import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";

import axios from "axios"; //비동기로 전달

const FileUpload = () => {
  //axios로 서버에서 받아온 이미지 정보 저장
  const [Images, setImages] = useState([]);

  //파일 업로드를 핸들링
  const dropHander = (files) => {
    let formData = new FormData(); //axios의 FormData를 통해 보내준다.
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]); //formData 안에 append를 통해 파일들이 더해서 들어간다

    //axios를 통해 요청을 보내면 백앤드에서 파일을 저장하고 .then으로 파일저장정보를 받아온다.
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        //기존 이미지를 넣어주고 새로 들어온 이미지를 추가해준다.
        setImages([...Images, response.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다!");
      }
    });
  };

  //이미지 삭제하기
  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image); //클릭한 이미지의 index를 찾는다.
    const newImages = [...Images]; //기존이미지들을 복사
    newImages.splice(currentIndex, 1); //클릭한 이미지의 인덱스 부터 1개를 지우겠다.(클릭한 이미지만 삭제)
    setImages(newImages); //업데이트
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Dropzone onDrop={dropHander}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: "1px solid #dcdcdc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>

      <div
        style={{
          width: "350px",
          height: "240px",
          display: "flex",
          overflowX: "scroll",
        }}
      >
        {Images.map((image, index) => (
          <div onClick={() => deleteHandler(image)} key={index}>
            <img
              style={{ minWidth: "300px", width: "300px", height: "240px" }}
              src={`http://localhost:5000/${image}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
