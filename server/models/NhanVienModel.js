import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaNV: {
      type: String,
      required: true,
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
    },
    Email: {
      type: String,
      required: true,
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
      type: String,
      default: "Đang làm việc",
    },
  },
  { timestamps: true }
);
export const NhanVienModel = mongoose.model("NhanVien", schema);
