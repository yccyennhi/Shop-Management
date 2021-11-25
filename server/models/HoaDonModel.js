import mongoose from "mongoose";
const Schema = mongoose.Schema
const schema = new Schema(
  {
    MaHD: {
      type: String,
      required: true,
      unique: true,
    },
    ThoiGian: {
      type: Date,
      required: true,
    },
    MaNV: {
      type: String,
      required: true,
    },
    idNV: {
      type: Schema.Types.ObjectId,
      ref: 'NhanVien',
      required: true,
    },
    idKM: {
      type: Schema.Types.ObjectId,
      ref: 'KhuyenMai',
      required: false,
    },
    MaKM: {
      type: String,
      required: false,
    },
    idKH: {
      type: Schema.Types.ObjectId,
      ref: 'KhachHang',
      required: false,
    },
    MaKH: {
      type: String,
      required: false,
    },
    DiemTru: {
      type: Number,
      required: false,
    },
    GiamGia:{
      type: Number,
      required: true,
    },
    SoLuong: {
      type: Number,
      required: true,
    },
    GiaVon: {
      type: Number,
      required: true,
    },
    TongTienHang: {
      type: Number,
      required: true,
    },
    ThanhTien: {
      type: Number,
      required: true,
    },
    TienKhachTra: {
      type: Number,
      required: true,
    },
    TienTraKhach: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);
export const HoaDonModel = mongoose.model("HoaDon", schema);
