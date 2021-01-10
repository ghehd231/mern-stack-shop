import React, { useEffect } from "react";
import axios from "axios";
//  ~/product/jewalsnasiv(유니크 아이디)에 따라 정보를 백앤드에서 가져와야함.

const DetailProductPage = (props) => {
  //상품의 유니크 id 가져오기
  const productId = props.match.params.productId;

  useEffect(() => {
    //type=single 은 하나만 가져온다.
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          alert("상세 정보 가져오기를 실패 했습니다.");
        }
      });
  }, []);
  return <div>DetailProductPage</div>;
};

export default DetailProductPage;
