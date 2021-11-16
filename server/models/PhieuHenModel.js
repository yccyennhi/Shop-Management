import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    MaPH: {
      type: String,
      required: true,
    },
    MaPBH: {
      type: String,
      required: true,
    },
    MaSP: {
      type: String,
      required: true,
    },
    TenSP: {
      type: String,
      required: true,
    },
    ThoiGianHen: {
      type: Date,
      required: true,
    } 
  },
  { timestamps: true }
);
export const PhieuHenModel = mongoose.model("PhieuHen", schema);
