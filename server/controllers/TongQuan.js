import moment from "moment";
import { HoaDonModel } from "../models/HoaDonModel.js";
import { PhieuDoiTraModel } from "./../models/PhieuDoiTraModel.js";
import { CTHDModel } from './../models/CTHDModel.js';

export const getHoaDonsToday = async (req, res, next) => {
  try {
    console.log("Vào getHoaDonsToday trong server");
    var today = moment().startOf("day");
    var tomorrow = moment(today).endOf("day");
    const HoaDonsToday = await HoaDonModel.find({
      // find in today
      ThoiGian: { $gte: today, $lte: tomorrow },
    });
    res.status(200).json(HoaDonsToday);
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

        rankingByDoanhThu [day] = 0;

        if (HoaDonsOfDay.length) {

          Object.values(HoaDonsOfDay).forEach((HoaDon) => {
            console.log(HoaDon);
            rankingByDoanhThu[day]+= HoaDon.ThanhTien;
         });

        }

      });

      firstDay = firstDay.add(1,'d');
    }
    res.status(200).json(rankingByDoanhThu);
  } catch (err) {

    res.status(500).json({ error: err });
  }
}



export const getHighestSanPhamList = async (req, res) => {

const highestSanPhamList = {}

  try {
  
      await CTHDModel.find()
      .then((CTHDs) => {

        if (CTHDs.length) {

          Object.values(CTHDs).forEach((CTHD) => {
            let types = CTHD.TenSP.concat(' (',CTHD.MauSac,')');
            if(!highestSanPhamList[types])
            {
              highestSanPhamList[types] = 0;
            }
              highestSanPhamList[types]+= CTHD.SoLuong;
         });


        }

      });
      res.status(200).json(highestSanPhamList);
  } catch (err) {

    res.status(500).json({ error: err });
  }
}