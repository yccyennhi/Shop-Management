import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaSP: {
      type: String,
      required: true,
    },
    TenSP: {
      type: String,
      required: true,
    },
    MauSac: {
      type: String,
      required: true,
    },
    HinhAnh: String,
    Size: {
      type: Number,
      required: true,
    },
    SoLuong: {
      type: Number,
      default: 0,
    },
    GiaBan: {
      type: Number,
      default: 0,
    },
    MoTa: {
      type: String,
      default: "",
    },
    TrangThai: {
      type: String,
      default: "Hết hàng",
    },
  },
  { timestamps: true }
);
export const SanPhamModel = mongoose.model("SanPham", schema);
