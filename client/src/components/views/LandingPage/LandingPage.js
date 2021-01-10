import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";

import CheckBox from "./Sections/CheckBox"; //체크 박스
import { continents } from "./Sections/Datas";
function LandingPage() {
  const [Products, setProducts] = useState([]);

  const [Skip, setSkip] = useState(0); //어디서 부터 가져오는지 (0부터 limit 까지)
  const [Limit, setLimit] = useState(8); //제한 갯수

  const [PostSize, setPostSize] = useState(0); // 더보기 버튼 전체 이미지를 모두 불러왔으면 안보이게 하기 위해 선언
  useEffect(() => {
    //skip 부터 limit 까지 가져오기 위해서 보냄
    let body = {
      skip: Skip,
      limit: Limit,
    };
    getProducts(body);
  }, []);

  //useState와 더보기 클릭했을때 모두 사용(비동기 호출)을 하기때문에 따로만듬.
  const getProducts = (body) => {
    //body는 skip과 limit을 가지고 있음
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          //더보기 클릭했으면 이전꺼에 더해지게
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          //더보기 클릭 전에는 Limit(8개) 까지만
          setProducts(response.data.productInfo);
        }

        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit; // 0+8 -> 8+8

    //새로 만들어서 보낸다
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true, //더보기 클릭했을때 가는 정보라는걸 표시
    };
    getProducts(body); //값 가져오고 난 후에
    setSkip(skip); //스킵 시켜줌
  };
  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  //자식 컴포넌트인 Checkbox에서 체크된 값을 가져오는 함수
  const handelFilters = () => {};
  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's Travel Anywhere <Icon type="rocket" />{" "}
          </h2>
        </div>

        {/* Filter */}

        {/* checkbox */}

        <CheckBox
          list={continents}
          handelFilters={(filters) => handelFilters(filters, "continents")}
        />
        {/* Search */}

        {/* Cards */}
        {/* gutter: 여백 */}
        <Row gutter={[16, 16]}>{renderCards}</Row>

        <br />
        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={loadMoreHandler}>더보기</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LandingPage;
