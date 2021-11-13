import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaTK: {
      type: String,
      required: true,
    },
    MaNV: {
      type: String,
      required: true,
    },
    TenTK: {
      type: String,
      required: true,
    },
    MatKhau: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const TaiKhoanModel = mongoose.model("TaiKhoan", schema);
