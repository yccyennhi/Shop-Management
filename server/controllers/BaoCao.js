import moment from "moment";
import { HoaDonModel } from "../models/HoaDonModel.js";
import { PhieuDoiTraModel } from "./../models/PhieuDoiTraModel.js";
import { CTHDModel } from "./../models/CTHDModel.js";
import { NhanVienModel } from "./../models/NhanVienModel.js";
import { PhieuNhapModel } from "./../models/PhieuNhapModel.js";

export const getCuoiNgays = async (req, res) => {
  try {
    // var today = moment().startOf("day");
    // var tomorrow = moment(today).endOf("day");
    // const HoaDonsToday = await HoaDonModel.find({
    //   // find in today
    //   ThoiGian: { $gte: today, $lte: tomorrow },
    // });
    await HoaDonModel.find()
      .populate("idNV", "TenNV")
      .exec(function (err, HoaDonsCuoiNgay) {
        if (err) console.log(err);
        res.status(200).json(HoaDonsCuoiNgay);
      });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBCBanHangs = async (req, res) => {
  const totalHoaDonByDay = {};
  try {
    // var today = moment().startOf("day");
    // var tomorrow = moment(today).endOf("day");
    // const HoaDonsToday = await HoaDonModel.find({
    //   // find in today
    //   ThoiGian: { $gte: today, $lte: tomorrow },
    // });

    await HoaDonModel.find().then((HoaDonsList) => {
      if (HoaDonsList.length) {
        Object.values(HoaDonsList).forEach((HoaDon) => {
          let date = moment(HoaDon.ThoiGian).startOf("day");

          if (!totalHoaDonByDay[date])
            totalHoaDonByDay[date] = {
              SoLuong: 0,
              TongTienHang: 0,
              GiamGia: 0,
              ThanhTien: 0,
              LoiNhuan: 0,
            };

          totalHoaDonByDay[date]["SoLuong"] += 1;
          totalHoaDonByDay[date]["TongTienHang"] += HoaDon.TongTienHang;
          totalHoaDonByDay[date]["GiamGia"] += HoaDon.GiamGia;
          totalHoaDonByDay[date]["ThanhTien"] += HoaDon.ThanhTien;
          totalHoaDonByDay[date]["LoiNhuan"] +=
            HoaDon.TongTienHang - HoaDon.GiaVon;
        });
      }
    });
    res.status(200).json(totalHoaDonByDay);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBCHangHoas = async (req, res) => {
  const hangHoaList = {};
  try {
    // var today = moment().startOf("day");
    // var tomorrow = moment(today).endOf("day");
    // const HoaDonsToday = await HoaDonModel.find({
    //   // find in today
    //   ThoiGian: { $gte: today, $lte: tomorrow },
    // });

    await PhieuNhapModel.find().then((PhieuNhaps) => {
      if (PhieuNhaps.length) {
        Object.values(PhieuNhaps).forEach((PhieuNhap) => {
          PhieuNhap.MaSP.forEach((MaSP) => {
            //Vị trí của sản phẩm trong list PhieuNhap
            let index = PhieuNhap.MaSP.indexOf(MaSP);
console.log(MaSP, index);
            if (!hangHoaList[MaSP]) {
              hangHoaList[MaSP] = {
                //TenSP=TenSP + MauSac + Size
                TenSP: PhieuNhap.TenSP[index].concat(
                  " (",
                  PhieuNhap.MauSac[index],
                  ") - ",
                  PhieuNhap.Size[index]
                ),

                Nhap: [],

                Xuat: [],
              };
            }
            if (!PhieuNhap.GiamGiaTongTien) {
              hangHoaList[MaSP]['Nhap'].push({
                Ngay: PhieuNhap.NgayTao,
                SoLuong: PhieuNhap.SoLuong[index],
                ThanhTien: PhieuNhap.ThanhTien[index],
              });
            } else {
              const giamGiaTrenSanPham =
                PhieuNhap.GiamGiaTongTien / PhieuNhap.TongSoLuong;
              hangHoaList[MaSP]['Nhap'].push({
                Ngay: PhieuNhap.NgayTao,
                SoLuong: PhieuNhap.SoLuong[index],
                ThanhTien: Math.round(PhieuNhap.ThanhTien[index] - giamGiaTrenSanPham*PhieuNhap.SoLuong[index]),
              });
              
            }
          });
        });
      }
    });
  console.log(hangHoaList);
  res.status(200).json(hangHoaList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
