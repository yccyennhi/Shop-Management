import moment from "moment";
import { HoaDonModel } from "../models/HoaDonModel.js";
import { PhieuDoiTraModel } from "./../models/PhieuDoiTraModel.js";
import { CTHDModel } from "./../models/CTHDModel.js";

export const getCuoiNgays = async (req, res) => {
  try {
    // var today = moment().startOf("day");
    // var tomorrow = moment(today).endOf("day");
    // const HoaDonsToday = await HoaDonModel.find({
    //   // find in today
    //   ThoiGian: { $gte: today, $lte: tomorrow },
    // });
    const HoaDons = await HoaDonModel.find().populate("idNV", ["TenNV"]);
    console.log(HoaDons);
    res.status(200).json(HoaDons);
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

    const HoaDons = await HoaDonModel.find().then((HoaDonsList) => {
      if (HoaDonsList.length) {

       Object.values(HoaDonsList).forEach((HoaDon) => {

          let date = HoaDon.ThoiGian.startOf("day");

          if (!totalHoaDonByDay[date])
            totalHoaDonByDay[date] = {
              SoLuong: 0,
              TongTienHang: 0,
              GiamGia: 0,
              ThanhTien: 0,
              LoiNhuan: 0,
            };
        
        totalHoaDonByDay[date]['SoLuong']+= HoaDon.SoLuong;
        totalHoaDonByDay[date]['TongTienHang']+=HoaDon.TongTienHang;
        totalHoaDonByDay[date]['GiamGia']+=HoaDon.GiamGia;
        totalHoaDonByDay[date]['ThanhTien']+=HoaDon.ThanhTien;
        totalHoaDonByDay[date]['LoiNhuan']+=HoaDon.LoiNhuan;
            
        });
      }
    });

    res.status(200).json(HoaDons);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
