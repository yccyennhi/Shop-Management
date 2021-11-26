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
      required: false,
    },
    MauSac: {
      type: [String],
      required: false,
    },
    Size: {
      type: [Number],
      required: false,
    },
    LoaiHang: {
      type: [String],
      required: false,
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
      required: false,
    },
    TenNCC: {
      type: String,
      required: false,
    },
    SoLuong: {
      type: [Number],
      required: false,
      default: 0,
    },
    GiaNhap: {
      type: [Number],
      required: false,
      default: 0,
    },
    ThanhTien: {
      type: [Number],
      required: false,
      default: 0,
    },

    GiamGia: {
      type: [Number],
      required: false,
      default: 0,
    },
    GiamGiaTongTien: {
      type: Number,
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
