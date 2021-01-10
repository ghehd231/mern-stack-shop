const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Product } = require("../models/Product");
//=================================
//             product
//=================================

//파일 저장 설정
var storage = multer.diskStorage({
  //어디에 파일이 저장이 되는지
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //root 디렉토리 uploads폴더 하위에 모두 저장
  },
  //파일 이름이 어떻게 저장 될껀지
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + "-" + Date.now());
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var upload = multer({ storage: storage }).single("file");

// 프론트에서 "/api/product/image" 의 요청에 응답
router.post("/image", (req, res) => {
  //multer를 이용해 가져온 이미지를 저장
  upload(req, res, (err) => {
    if (err) {
      //파일을 저장하다 에러가 나면 front에 알려준다.
      return req.json({ success: false, err });
    }

    //저장에 성공하면 파일저장 정보(filePath: 어디에 저장했는지, filename: 파일이름)을
    //front에 알려준다.
    return res.json({
      success: true,
      filePath: res.req.file.path,
      filename: res.req.file.filename,
    });
  });
});

router.post("/", (req, res) => {
  const product = new Product(req.body); //form으로 전달해준 정보들을 req.body 받아와 새로운 객체을 만든다.

  //저장
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

//product 콜렉션에 모든 정보 가져오기, 더보기 기능, 필터기능을 수행
router.post("/products", (req, res) => {
  /* 
     populate("writer") : writer에 해당하는 모든 정보를 가져올 수 있다.
      ㄴ>(mongoDB에는 writer : ObjectId("123nasn") 이런식으로 밖에 안보이는데 해당 유저 정보를 모두 가져오겠다는뜻)
     
     find: 필터 기능 에서 사용하고 [2,3]에 해당하는 값을 가져온다. (검색어 에서는 find를 하나더 추가함)
     exec: 쿼리 돌리고 난 후 정보를 가져옴
     skip: 처음에 어디서 부터 값을 가져올 건지 지정
     limit: 몇개까지 가져올 건지 지정 
   */
  let limit = req.body.limit ? parseInt(req.body.limit) : 20; //정해진 limit 이 있으면 숫자로 변환 하고 없으면 지정
  let skip = req.body.skip ? parseInt(req.body.skip) : 0; //있으면 숫자변환 없으면 0으로 지정
  let term = req.body.searchTerm; //검색어

  //필터 기능을 위한 작업
  let findArgs = {};

  for (let key in req.body.filters) {
    //filters['continents'].length >0 크면 continents : [2,4,5] 처럼 하나 이상 값이 있다라는뜻
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        //gte(greater then equal) : (이것) 보다 크거나 같고
        //lte(less then equal) : (이것) 보다 작거나 같고
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        // let findArgs = { continents: [2,4,5] }
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  //검색어
  if (term) {
    //검색어 있으면 아래와 동일하지만 find를 하나더 추가
    Product.find(findArgs)
      .find({ $text: { $search: term } }) //검색어
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  } else {
    //없으면 상품 관련 검색(더보기, 전체보기, 필터)

    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
          .status(200)
          .json({ success: true, productInfo, postSize: productInfo.length });
      });
  }
});
module.exports = router;
