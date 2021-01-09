import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
function LandingPage() {
  const [Products, setProducts] = useState([]);

  const [Skip, setSkip] = useState(0); //어디서 부터 가져오는지 (0부터 limit 까지)
  const [Limit, setLimit] = useState(8); //제한 갯수
  useEffect(() => {
    //skip 부터 limit 까지 가져오기 위해서 보냄
    let body = {
      skip: Skip,
      limit: Limit,
    };

    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        console.log(response.data.productInfo);
        setProducts([...response.data.productInfo]);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const loadMoreHandler = () => {};
  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's Travel Anywhere <Icon type="rocket" />{" "}
          </h2>
        </div>

        {/* Filter */}

        {/* Search */}

        {/* Cards */}
        {/* gutter: 여백 */}
        <Row gutter={[16, 16]}>{renderCards}</Row>

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
