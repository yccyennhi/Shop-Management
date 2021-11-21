import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    SanPhamDangKinhDoanh: {
      type: Number,
    },
    SanPhamHetHang: {
      type: Number,
    },
    SanPhamNgungKinhDoanh: {
      type: Number,
    },
    SanPhamConBaoHanh: {
      type: Number,
    },
    SanPhamHetBaoHanh: {
      type: Number,
      default: 0,
    },
  }
);
export const QLSanPhamModel = mongoose.model("QLSanPham", schema);
