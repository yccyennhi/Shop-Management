import mongoose from "mongoose";
const Schema= mongoose.Schema
const schema = new mongoose.Schema(
  {
    idPDT: {
      type:  Schema.Types.ObjectId,
      ref: 'PhieuDoiTra',
      required: true,
    },
    MaPDT: {
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
    SoLuong: {
      type: Number,
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
