import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaPN: {
      type: String,
      required: true,
      unique: true,
    },
    MaSP: {
      type: [String],
      required: true,
    },
    TenSP: {
      type: [String],
      required: true,
    },
    MauSac: {
      type: [String],
      required: true,
    },
    Size: {
      type: [Number],
      required: true,
    },
    LoaiHang: {
      type: [String],
      required: true,
    },
    NguoiNhap: {
      type: String,
      required: true,
      default: "admin",
    },
    NguoiTao: {
      type: String,
      required: true,
      default: "admin",
    },
    NgayTao: {
      type: Date,
      required: true,
    },
    NgayCapNhat: {
      type: Date,
      required: true,
    },
    TenNCC: {
      type: String,
      required: false,
    },
    SoLuong: {
      type: [Number],
      required: true,
    },
    GiaNhap: {
      type: [Number],
      required: true,
    },
    ThanhTien: {
      type: [Number],
      required: true,
    },

    GiamGia: {
      type: [Number],
      required: false,
      default: 0,
    },
    TongSoLuong: {
      type: Number,
      required: true,
      default: 0,
    },
    TongTien: {
      type: Number,
      required: true,
      default: 0,
    },
    TienTra: {
      type: Number,
      required: true,
      default: 0,
    },
    TrangThai: {
      type: String,
      enum: ["Đã nhập hàng", "Phiếu tạm", "Đã hủy"],
      default: "Phiếu tạm",
    },
    GhiChu: {
      type: String,
    },
  },
  { timestamps: true }
);
export const PhieuNhapModel = mongoose.model("PhieuNhap", schema);
