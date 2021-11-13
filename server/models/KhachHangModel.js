import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaKH: {
      type: String,
      required: true,
    },
    TenKH: {
      type: String,
      required: true,
    },
    NgaySinh: {
      type: Date,
      required: true,
    },
    SDT: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    DiaChi: {
      type: String,
      default: "",
    },
    DiemTichLuy: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const KhachHangModel = mongoose.model("KhachHang", schema);
