import { CTHDModel } from "../models/CTHDModel.js";

export const getCTHD = async (req, res) => {
  // const cthd = new CTHDModel({
  //   MaSP: 'MA001',
  //   SoLuong: 0,
  //   MauSac: 'do',
  //   Syze: '39',
  //   DonGia: 0,
  //   ThanhTien: 0,
  // });
  // cthd.save();
  try {
    const CTHDs = await CTHDModel.find();
    console.log("CTHDs", CTHDs);
    res.status(200).json(CTHDs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createCTHD = async (req, res) => {
  try {
    const newCTHD = req.body;

    const CTHD = new HoaDonModel(newCTHD);
    await CTHD.save();

    res.status(200).json(CTHD);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateCTHD = async (req, res) => {
  try {
    const updateCTHD = req.body;
    const cthd = await CTHDModel.findOneAndUpdate(
      { _id: updateCTHD._id },
      updateCTHD,
      { new: true }
    );
    res.status(200).json(cthd);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
