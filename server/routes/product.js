const express = require("express");
const router = express.Router();
const multer = require("multer");
//=================================
//             product
//=================================

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

module.exports = router;
