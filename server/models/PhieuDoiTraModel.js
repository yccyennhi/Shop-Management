import mongoose from "mongoose";
const Schema = mongoose.Schema;
const schema = new Schema(
  {
    MaPDT: {
      type: String,
      required: true,
      unique: true,
    },
    idHD: {
      type: Schema.Types.ObjectId,
      ref: "HoaDon",
      required: true,
    },
    MaHD: {
      type: String,
      required: true,
    },
    idNV: {
      type: Schema.Types.ObjectId,
      ref: "NhanVien",
      required: true,
    },
    MaNV: {
      type: String,
      required: true,
    },
    idKH: {
      type: Schema.Types.ObjectId,
      ref: "KhachHang",
      required: true,
    },
    MaKH: {
      type: String,
      required: true,
    },
    SoLuong: {
      type: Number,
      required: true,
    },
    ThoiGian: {
      type: Date,
      required: true,
    },
    TongTienHang: {
      type: Number,
      required: true,
    },
    GiaVon: {
      type: Number,
      default: 0,
    },
    GiamGia: {
      type: Number,
      default: 0,
    },
    ThanhTien: {
      type: Number,
      default: 0,
    },
    CTPDT: {
      type: [
        {
          idSP: {
            type: Schema.Types.ObjectId,
            ref: "SanPham",
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
          GiaBan: {
            type: Number,
            required: true,
          },
          GiaVon: {
            type: Number,
            default: 0,
          },
          SoLuong: {
            type: Number,
            required: true,
          },
          ThanhTien: {
            type: Number,
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);
export const PhieuDoiTraModel = mongoose.model("PhieuDoiTra", schema);
