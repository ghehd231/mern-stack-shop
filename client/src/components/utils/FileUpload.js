import React from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";

import axios from "axios"; //비동기로 전달

const FileUpload = () => {
  //파일 업로드를 핸들링
  const dropHander = (files) => {
    //axios의 FormData를 통해 보내준다.
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    //formData 안에 append를 통해 파일들이 더해서 들어간다
    formData.append("file", files[0]);

    //axios를 통해 요청을 보내면 백앤드에서 파일을 저장하고 .then으로 파일저장정보를 받아온다.
    axios.post("/api/product/image", formData, config).then((response) => {
      if (response.data.success) {
      } else {
        alert("파일을 저장하는데 실패했습니다!");
      }
    });
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
            {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default FileUpload;
