import mongoose from "mongoose";
const Schema= mongoose.Schema
const schema = new mongoose.Schema(
  {
    MaPDT: {
      type: String,
      required: true,
    },
    MaHD: {
      type: String,
      required: true,
    },
    idSP: {
      type:  Schema.Types.ObjectId,
      ref: 'SanPham',
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
    GiaBan: {
      type: Number,
      required: true,
    },
    GiaVon: {
      type: Number,
      default: 0,
    },
    SoLuong: {
      type: Number,
      required: true,
    },
    ThoiGian: {
      type: Date,
      required: true,
    },
    ThanhTien: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const CTPDTModel = mongoose.model("CTPDT", schema);
