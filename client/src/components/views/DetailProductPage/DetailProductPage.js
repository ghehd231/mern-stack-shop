import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";
import { Col, Row } from "antd";
//  ~/product/jewalsnasiv(유니크 아이디)에 따라 정보를 백앤드에서 가져와야함.

const DetailProductPage = (props) => {
  //상품의 유니크 id 가져오기 /~/jewalsnasiv
  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});

  useEffect(() => {
    //type=single 은 하나만 가져온다.
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          //가져온 값을 state에 저장
          setProduct(response.data.product[0]);
        } else {
          alert("상세 정보 가져오기를 실패 했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      {/* gutter은 여백 */}
      <Row gutter={[16, 16]}>
        <Col lg={12} sm={24}>
          {/* ProductImage */}
          <ProductImage detail={Product} />
        </Col>
        <Col lg={12} sm={24}>
          {/* ProductInfo */}
          <ProductInfo />
        </Col>
      </Row>
    </div>
  );
};

export default DetailProductPage;
