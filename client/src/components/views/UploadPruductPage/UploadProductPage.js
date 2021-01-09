import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Asia" },
  { key: 3, value: "test" },
  { key: 4, value: "tet2" },
];
function UploadProductPage() {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandeler = (event) => {
    setTitle(event.currentTarget.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  };
  const continentChangeHandler = (event) => {
    console.log(event.currentTarget.value);
    setContinent(event.currentTarget.value); //select의 value를 바꿔줌
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 level={2}>여행 상품 업로드</h2>
      </div>
      <Form>
        <label>이름</label>
        <Input onChange={titleChangeHandeler} value={Title} />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <label>가격</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
      </Form>
    </div>
  );
}

export default UploadProductPage;
