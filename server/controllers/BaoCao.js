import moment from "moment";
import { HoaDonModel } from "../models/HoaDonModel.js";
import { PhieuDoiTraModel } from "./../models/PhieuDoiTraModel.js";
import { CTHDModel } from "./../models/CTHDModel.js";
import { NhanVienModel } from "./../models/NhanVienModel.js";
import { PhieuNhapModel } from "./../models/PhieuNhapModel.js";
import { CTPDTModel } from "./../models/CTPDTModel.js";

export const getCuoiNgays = async (req, res) => {
  try {
    // var today = moment().startOf("day");
    // var tomorrow = moment(today).endOf("day");
    // const HoaDonsToday = await HoaDonModel.find({
    //   // find in today
    //   ThoiGian: { $gte: today, $lte: tomorrow },
    // });
    const cuoiNgays = {};
    //Tìm hóa đơn theo ngày
    await HoaDonModel.find()
      .populate("idNV", "TenNV")
      .exec()
      .then((HoaDonsCuoiNgay) => (cuoiNgays["HoaDons"] = HoaDonsCuoiNgay));

    //Tìm đổi trả theo ngày
    await PhieuDoiTraModel.find()
      .populate("idNV", "TenNV")
      .exec()
      .then((DoiTrasCuoiNgay) => (cuoiNgays["DoiTras"] = DoiTrasCuoiNgay));

    //Tìm đơn nhập hàng
    await PhieuNhapModel.find().then(
      (PhieuNhapsCuoiNgay) => (cuoiNgays["NhapHangs"] = PhieuNhapsCuoiNgay)
    );

    console.log(cuoiNgays);
    res.status(200).json(cuoiNgays);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getBCBanHangs = async (req, res) => {
  const totalHoaDonByDay = {};
  try {
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

    await PhieuDoiTraModel.find().then((DoiTrasList) => {
      if (DoiTrasList.length) {
        Object.values(DoiTrasList).forEach((DoiTra) => {
          let date = moment(DoiTra.ThoiGian).startOf("day");
          if (!totalHoaDonByDay[date])
            totalHoaDonByDay[date] = {
              SoLuong: 0,
              TongTienHang: 0,
              GiamGia: 0,
              ThanhTien: 0,
              LoiNhuan: 0,
            };
          totalHoaDonByDay[date]["SoLuong"] += 1;
          totalHoaDonByDay[date]["TongTienHang"] -= DoiTra.TongTienHang;
          totalHoaDonByDay[date]["GiamGia"] -= DoiTra.GiamGia;
          totalHoaDonByDay[date]["ThanhTien"] -= DoiTra.ThanhTien;
          totalHoaDonByDay[date]["LoiNhuan"] -=
            DoiTra.TongTienHang - DoiTra.GiaVon;
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
          if ((PhieuNhap.TrangThai = "Đã nhập hàng")) {
            PhieuNhap.MaSP.forEach((MaSP) => {
              //Vị trí của sản phẩm trong list PhieuNhap
              let index = PhieuNhap.MaSP.indexOf(MaSP);

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
                hangHoaList[MaSP]["Nhap"].push({
                  Ngay: PhieuNhap.NgayTao,
                  SoLuong: PhieuNhap.SoLuong[index],
                  ThanhTien: PhieuNhap.ThanhTien[index],
                });
              } else {
                const giamGiaTrenSanPham =
                  PhieuNhap.GiamGiaTongTien / PhieuNhap.TongSoLuong;
                hangHoaList[MaSP]["Nhap"].push({
                  Ngay: PhieuNhap.NgayTao,
                  SoLuong: PhieuNhap.SoLuong[index],
                  ThanhTien: Math.round(
                    PhieuNhap.ThanhTien[index] -
                      giamGiaTrenSanPham * PhieuNhap.SoLuong[index]
                  ),
                });
              }
            });
          }
        });
      }
    });

    
    await HoaDonModel.find().then((HoaDons) => {
      if (HoaDons.length) {
        Object.values(HoaDons).forEach((HoaDon) => {
          const CTHDs = HoaDon["CTHD"];
          Object.values(CTHDs).forEach((CTHD) => {
            const MaSP = CTHD.MaSP;
            hangHoaList[MaSP]["Xuat"].push({
              Ngay: HoaDon.ThoiGian,
              SoLuong: CTHD.SoLuong,
              ThanhTien: CTHD.GiaVon * CTHD.SoLuong,
            });
          });
        });
      }
    });

    await PhieuDoiTraModel.find().then((DoiTras) => {
      if (DoiTras.length) {
        Object.values(DoiTras).forEach((DoiTra) => {
          const CTPDTs = DoiTra["CTPDT"];
          Object.values(CTPDTs).forEach((CTDT) => {
            const MaSP = CTDT.MaSP;
            hangHoaList[MaSP]["Xuat"].push({
              Ngay: DoiTra.ThoiGian,
              SoLuong: -CTDT.SoLuong,
              ThanhTien: -(CTDT.GiaVon * CTDT.SoLuong),
            });
          });
        });
      }
    });
    console.log('hangHoaList',hangHoaList);
    res.status(200).json(hangHoaList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
