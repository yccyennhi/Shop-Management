import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaSP: {
      type: String,
      required: true,
      unique: true,
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
    ThoiGianBaoHanh: {
      type: Number,
      default: 0,
    },
    MoTa: {
      type: String,
      default: "",
    },
    TrangThai: {
      type: String,
      enum: ["Ngừng kinh doanh", "Hết hàng", "Đang kinh doanh"],
      default: "Đang kinh doanh",
    },
    BaoHanh: {
      type: String,
      enum: ["Không bảo hành", "Có bảo hành"],
      default: "Không bảo hành",
    },
  },
  { timestamps: true }
);
export const SanPhamModel = mongoose.model("SanPham", schema);
