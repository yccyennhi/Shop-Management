import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaPN: {
      type: String,
      required: true,
      unique: true,
    },
    MaSP: {
      type: [String],
      required: true,
    },
    SoLuong: {
      type: [Number],
      required: true,
    },
    GiaNhap: {
      type: [Number],
      required: true,
    },
    ThanhTien: {
      type: [Number],
      required: true,
    },
    NgayNhap: {
      type: Date,
      required: true,
    },
    TongTien: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const PhieuNhapModel = mongoose.model("PhieuNhap", schema);
