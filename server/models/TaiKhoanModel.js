import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaNV: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "KhachHang",
      required: true,
    },
    TenTK: {
      type: String,
      required: true,
      unique: true,
    },
    MatKhau: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const TaiKhoanModel = mongoose.model("TaiKhoan", schema);