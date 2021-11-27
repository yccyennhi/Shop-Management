import { HoaDonModel } from "../models/HoaDonModel.js";
import { KhuyenMaiModel } from "../models/KhuyenMaiModel.js";
import moment from "moment";

export const getHoaDons = async (req, res) => {
  try {
    const HoaDons = await HoaDonModel.find();

    console.log("HoaDons", HoaDons);
    res.status(200).json(HoaDons);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createHoaDon = async (req, res) => {
  try {
    const newHoaDon = req.body;

    const HoaDon = new HoaDonModel(newHoaDon);
    await HoaDon.save();
    const KM = await KhuyenMaiModel.findOne({_id: HoaDon.idKM});
    KM.SoLuong -= 1;
    if (KM.SoLuong === 0) KM.TrangThai = false;
    console.log(KM);
    const KhuyenMai = await KhuyenMaiModel.findOneAndUpdate(
      { _id: KM._id },
      KM,
      { new: true }
    );
    res.status(200).json(HoaDon);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const updateHoaDon = async (req, res) => {
  try {
    const updateHoaDon = req.body;
    const hoadon = await HoaDonModel.findOneAndUpdate(
      { _id: updateHoaDon._id },
      updateHoaDon,
      { new: true }
    );
    res.status(200).json(hoadon);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateSLKM = async (req,res) => {
  try {
    const KM = await KhuyenMaiModel.findOne({_id: req.body.idKM});
    KM.SoLuong -= 1;
    if (KM.SoLuong === 0) KM.TrangThai = false;
    console.log(KM);
    const KhuyenMai = await KhuyenMaiModel.findOneAndUpdate(
      { _id: KM._id },
      KM,
      { new: true }
    );
    res.status(200).json(KhuyenMai);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}