import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaNV: {
      type: String,
      required: true,
      unique: true,
    },
    TenNV: {
      type: String,
      required: true,
    },
    NgaySinh: {
      type: Date,
      required: true,
    },
    SDT: {
      type: String,
      required: true,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    DiaChi: {
      type: String,
      default: "",
    },
    NgayVaoLam: {
      type: Date,
      default: new Date(),
    },
    TrangThai: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export const NhanVienModel = mongoose.model("NhanVien", schema);
