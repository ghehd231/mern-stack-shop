import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadProductPage from "./views/UploadPruductPage/UploadProductPage";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          {/* 상품 올리는 페이지 로그인 된사람만 = true */}
          <Route
            exact
            path="/product/upload"
            component={Auth(UploadProductPage, true)}
          />
          {/* 상세 페이지(아무나 들어가도 됌 Auth(component, null)
           <a href={`/product/${product._id}`}></a>에서 받는다 */}
          <Route
            exact
            path="/product/:productId"
            component={Auth(DetailProductPage, null)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
