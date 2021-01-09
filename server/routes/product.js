const express = require("express");
const router = express.Router();

//=================================
//             product
//=================================
// 프론트에서 /api/product/image 의 요청에 응답
router.post("/image", (req, res) => {
  //multer를 이용해 가져온 이미지를 저장
});

module.exports = router;
