import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaSP: {
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
export const CTHDModel = mongoose.model("CTHD", schema);
