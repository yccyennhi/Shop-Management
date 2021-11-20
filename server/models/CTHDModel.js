import mongoose from "mongoose";
const Schema = mongoose.Schema
const schema = new Schema(
  {
    MaHD: {
      type : Schema.Types.ObjectId,
      ref: 'HoaDons',
      required: true,
    },
    MaSP: {
      type:  Schema.Types.ObjectId,
      ref: 'SanPhams',
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
