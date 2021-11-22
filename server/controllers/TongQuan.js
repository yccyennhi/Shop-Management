import moment from "moment";
import { HoaDonModel } from "../models/HoaDonModel.js";
import { PhieuDoiTraModel } from './../models/PhieuDoiTraModel.js';

export const getHoaDonsToday = async (req, res) => {
  try {
    var today = moment().startOf("day");
    var tomorrow = moment(today).endOf("day");
    const HoaDonsToday = await HoaDonModel.find({
      // find in today
      ThoiGian: { $gte: today, $lte: tomorrow },
    });

    res.status(200).json(HoaDonsToday);
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

