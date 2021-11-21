import mongoose from "mongoose";
const Schema = mongoose.Schema
const schema = new Schema(
  {
    MaHD: {
      type: String,
      required: true,
    },
    ThoiGian: {
      type: Date,
      required: true,
    },
    MaNV: {
      type: Schema.Types.ObjectId,
      ref: 'NhanViens',
      required: true,
    },
    MaKM: {
      type: Schema.Types.ObjectId,
      ref: 'KhuyenMais',
      required: false,
    },
    MaKH: {
      type: Schema.Types.ObjectId,
      ref: 'KhachHangs',
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
export const HoaDonModel = mongoose.model("HoaDons", schema);
