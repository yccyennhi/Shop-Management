import moment from "moment";
import { HoaDonModel } from "../models/HoaDonModel.js";
import { PhieuDoiTraModel } from "./../models/PhieuDoiTraModel.js";
import { CTHDModel } from "./../models/CTHDModel.js";

export const getHoaDonsByDay = async (day) => {
  // find in day
  var today = moment(day).startOf("day");
  var tomorrow = moment(today).endOf("day");
  var tongDoanhThu = 0;

  const SLHoaDonsToday = await HoaDonModel.find({
    ThoiGian: { $gte: today, $lte: tomorrow },
  }).then((HoaDons) => {
    HoaDons.forEach((HoaDon) => {
      tongDoanhThu += HoaDon["ThanhTien"];
    });
    return HoaDons.length;
  });
  return { SoLuong: SLHoaDonsToday, DoanhThu: tongDoanhThu };
};

export const getHoaDonsToday = async (req, res, next) => {
  try {
    const thongKeHoaDons = {};
    var today = moment().subtract(1,'day');
    var todayLast = moment(today).subtract(1, "month");

    thongKeHoaDons["today"] = await getHoaDonsByDay(today);
    thongKeHoaDons["lastToday"] = await getHoaDonsByDay(todayLast);

    res.status(200).json(thongKeHoaDons);

    next();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getDoiTrasToday = async (req, res) => {
  try {
    var today = moment().startOf("day");
    var tomorrow = moment(today).endOf("day");
    const DoiTrasToday = await PhieuDoiTraModel.find({
      // find in today
      ThoiGian: { $gte: today, $lte: tomorrow },
    });

    res.status(200).json(DoiTrasToday);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getRankingByDoanhThu = async (req, res) => {
  const rankingByDoanhThu = {};

  try {
    var firstDay = moment().startOf("month");
    const endDay = moment().endOf("month");

    while (moment(firstDay).endOf("day").isSameOrBefore(endDay)) {
      await HoaDonModel.find({
        // find by day
        ThoiGian: { $gte: firstDay, $lte: moment(firstDay).endOf("day") },
      }).then((HoaDonsOfDay) => {
        const day = firstDay.get("date");

        rankingByDoanhThu[day] = 0;

        if (HoaDonsOfDay.length) {
          Object.values(HoaDonsOfDay).forEach((HoaDon) => {
            rankingByDoanhThu[day] += HoaDon.ThanhTien;
          });
        }
      });

      firstDay = firstDay.add(1, "d");
    }
    res.status(200).json(rankingByDoanhThu);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getHighestSanPhamList = async (req, res) => {
  const highestSanPhamList = {};

  try {
    await CTHDModel.find().then((CTHDs) => {
      if (CTHDs.length) {
        Object.values(CTHDs).forEach((CTHD) => {
          let types = CTHD.TenSP.concat(" (", CTHD.MauSac, ")");
          if (!highestSanPhamList[types]) {
            highestSanPhamList[types] = {
              SoLuong: 0,
              ThanhTien: 0,
            };
          }
          highestSanPhamList[types]["SoLuong"] += CTHD.SoLuong;
          highestSanPhamList[types]["ThanhTien"] += CTHD.ThanhTien;
        });
      }
    });
    console.log(highestSanPhamList);
    res.status(200).json(highestSanPhamList);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
