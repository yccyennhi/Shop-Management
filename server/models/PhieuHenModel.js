import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaPH: {
      type: String,
      required: true,
      unique: true,
    },
    MaPBH: {
      type: String,
      required: true,
    },
    MaSP: {
      type: String,
      required: true,
    },
    NgayHen: {
      type: Date,
      required: true,
    },
    TrangThai: {
      type: String,
      enum: ["Hoàn thành", "Chưa hoàn thành"],
      default: "Chưa hoàn thành",
    },
    GhiChu: {
      type: String,
    },
  },
  { timestamps: true }
);
export const PhieuHenModel = mongoose.model("PhieuHen", schema);
