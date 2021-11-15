import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaHD: {
      type: String,
      required: true,
    },
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
      type: Number,
      required: true,
    },
    GiaBan: {
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
