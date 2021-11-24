import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaPBH: {
      type: String,
      required: true,
      unique: true,
    },
    MaHD: {
      type: String,
      required: true,
    },
    MaSP: {
      type: String,
      required: true,
    },
    NgayBD:{
      type: Date,
      required: true,
    },
    NgayKT:{
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const PhieuBaoHanhModel = mongoose.model("PhieuBaoHanh", schema);
