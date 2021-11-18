import mongoose from "mongoose";
const Schema = mongoose.Schema
const schema = new Schema(
  {
    MaPDT: {
      type: String,
      required: true,
    },
    MaHD: {
      type: Schema.Types.ObjectId,
      ref: 'HoaDons',
      required: true,
    },
    MaNV: {
      type:  Schema.Types.ObjectId,
      ref: 'NhanViens',
      required: true,
    },
    ThoiGian: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
export const PhieuDoiTraModel = mongoose.model("PhieuDoiTras", schema);
