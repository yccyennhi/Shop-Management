import mongoose from "mongoose";
const Schema = mongoose.Schema
const schema = new Schema(
  {
    MaHD: {
      type: String,
      required: true,
    },
    idSP: {
      type:  Schema.Types.ObjectId,
      ref: 'SanPham',
      required: true,
    },
    MaSP:{
      type: String,
      required: true,
    },
    TenSP: {
      type: String,
      required: true,
    },
    SoLuong: {
      type: Number,
      required: true,
    },
    MauSac: {
      type: String,
      default: 0
    },
    Size: {
      type: Number,
      default: 0
    },
    GiaVon:{
      type:Number,
      required: true,
    },
    DonGia: {
      type: Number,
      required: true,
    },
    BaoHanh: {
      type: String,
      enum: ["Không bảo hành", "Có bảo hành"],
      default: "Không bảo hành",
    },
    ThanhTien: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const CTHDModel = mongoose.model("CTHD", schema);
