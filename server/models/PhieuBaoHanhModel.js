import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaPBH: {
      type: String,
      required: true,
    },
    MaHD: {
      type: String,
      required: true,
    },
    MaSP: {
      type: String,
      required: true,
    },
    TenSP: {
      type: String,
      required: true,
    },
    NgayKetThucBH:{
      type: Date,
      required: true,
    } 
  },
  { timestamps: true }
);
export const PhieuBaoHanhModel = mongoose.model("PhieuBaoHanh", schema);
