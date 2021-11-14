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
    LoaiHang: {
      type: String,
      required: true,
    },
    HinhAnh: String,
    Size: {
      type: Number,
      required: true,
    },
    TonKho: {
      type: Number,
      default: 0,
    },
    GiaBan: {
      type: Number,
      default: 0,
    },
    GiaVon: {
      type: Number,
      default: 0,
    },
    MoTa: {
      type: String,
      default: "",
    },
    TrangThai: {
      type: Number,
      default: 0,
    },
    BaoHanh: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
export const SanPhamModel = mongoose.model("SanPham", schema);
