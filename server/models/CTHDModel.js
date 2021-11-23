import mongoose from "mongoose";
const Schema = mongoose.Schema
const schema = new Schema(
  {
    idHD: {
      type : Schema.Types.ObjectId,
      ref: 'HoaDons',
      required: true,
    },
    MaHD: {
      type: String,
      required: true,
    },
    idSP: {
      type:  Schema.Types.ObjectId,
      ref: 'SanPhams',
      required: true,
    },
    MaSP:{
      type: String,
      required: true,
    },
    TenSP: {
      type: String,
      required: true,
    },
    SoLuong: {
      type: Number,
      required: true,
    },
    MauSac: {
      type: String,
      required: true,
    },
    Size: {
      type: String,
      required: false,
    },
    DonGia: {
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
export const CTHDModel = mongoose.model("CTHDs", schema);
