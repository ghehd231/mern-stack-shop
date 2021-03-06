const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    writer: {
      //글쓴사람
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      //타이블
      type: String,
      maxlength: 50,
    },
    description: {
      //설명
      type: String,
    },
    price: {
      //가격
      type: Number,
      default: 0,
    },
    images: {
      //이미지
      type: Array,
      default: [],
    },
    sold: {
      //얼마나 팔렸는지
      type: Number,
      maxlength: 100,
      default: 0,
    },

    continents: {
      type: Number,
      default: 1,
    },

    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true } //자동적으로 등록시간 업데이트
);

//검색어가 중점적으로 탐색해야 할 필드를 지정
productSchema.index(
  {
    title: "text", //제목과
    description: "text", //설명을 검색한다
  },
  {
    weights: {
      title: 5, //타이틀을 훨신 중요하게 여겨서 검색
      description: 1,
    },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };
