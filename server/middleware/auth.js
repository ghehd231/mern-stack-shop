const { User } = require("../models/User");

let auth = (req, res, next) => {
  let token = req.cookies.w_auth; //쿠키에 담겨있는 정보를 이용해서 사용자의 정보를 가져옴

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token; //req.token으로 users.js 에서 받아올 수 있음
    req.user = user; //req.user로 받아올 수 있음
    next();
  });
};

module.exports = { auth };
