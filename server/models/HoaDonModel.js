import mongoose from "mongoose";
const Schema = mongoose.Schema
const schema = new Schema(
  {
    MaHD: {
      type: String,
      required: true,
      unique: true,
    },
    ThoiGian: {
      type: Date,
      required: true,
    },
    MaNV: {
      type: String,
      required: true,
    },
    idNV: {
      type: Schema.Types.ObjectId,
      ref: 'NhanVien',
      required: true,
    },
    idKM: {
      type: Schema.Types.ObjectId,
      ref: 'KhuyenMai',
      required: false,
    },
    MaKM: {
      type: String,
      required: false,
    },
    idKH: {
      type: Schema.Types.ObjectId,
      ref: 'KhachHang',
      required: false,
    },
    MaKH: {
      type: String,
      required: false,
    },
    DiemTru: {
      type: Number,
      required: false,
    },
    GiamGia:{
      type: Number,
      required: true,
    },
    SoLuong: {
      type: Number,
      required: true,
    },
    GiaVon: {
      type: Number,
      required: true,
    },
    TongTienHang: {
      type: Number,
      required: true,
    },
    ThanhTien: {
      type: Number,
      required: true,
    },
    TienKhachTra: {
      type: Number,
      required: true,
    },
    TienTraKhach: {
      type: Number,
      required: true,
    },
    GhiChu: {
      type: String,
      default: ''
    },
    CTHD: {
      type: [{
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
          type: Number,
          default: 0,
        },
        ThanhTien: {
          type: Number,
          required: true,
        }
      }],
      required: true,
    }
  },
  { timestamps: true }
);
export const HoaDonModel = mongoose.model("HoaDon", schema);
