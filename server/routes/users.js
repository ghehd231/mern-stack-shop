const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

//카트에 상품 추가(있다면 상품갯수 업데이트)
/**
 * findOne : 해당하는 것 하나만 가져오기
 * findOneAndUpdate: 해당하는 것 하나만 가져와서 업데이트-> 이거는 유저id에 해당하는 유저정보를 가져와서 해당 유저의 카트에 있는 정보도 조회해야함
 *   $inc : {"어디에 있는 정보를 찾는지",올릴 숫자}
 *   $push: 이미 들어있는 거 뒤에 정보를 넣는다.
 *   {new : true} : findOneAndUpdate에서 업데이트 된 후에 정보를 보내줘야 할때 true로 지정
 */
router.post("/addToCart", auth, (req, res) => {
  //먼저 User 콜렉션에 해당 유저의 정보를 가져오기 (req.user._id로 가져올 수 있는 이유는 auth 미들웨어 덕분임)
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    //가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
    //(userInfo에 있는 cart정보와 req.body.productId로 받아온 상품의 id가 있는지 체크)
    let duplicate = false;
    userInfo.forEach((item) => {
      if (item.id === req.body.productId) {
        //카트에 이미 존재
        duplicate = true;
      }
    });

    if (duplicate) {
      //상품이 이미 있을때 => 해당 유저의 카트에 담긴 상품의 갯수를 +1
      User.findOneAndUpdate(
        {
          _id: req.user._id,
          "cart.id": req.body.productId,
        },
        { $inc: { "cart.$.quantity": 1 } }, //cart의 수량을 1만큼 증가
        { new: true }, //update된 정보를 받아오려면 new를 true로 설정해줘야함
        (err, userInfo) => {
          if (err) return res.status(200).json({ success: false, err });
          return res.status(200).send(userInfo.cart);
        }
      );
    } else {
      //들어 있지 않을때 => 해당유저의 카트에 정보 추가
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $push: {
            cart: {
              _id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true }, //똑같이 업데이트 된 후에 정보를 받아야 하기 때문에
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          return res.status(200).send(userInfo.cart); //이 정보는 _actions에 user_actions.js 로 간다.
        }
      );
    }
  });
});
module.exports = router;
