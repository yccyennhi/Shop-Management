import { CTPDTModel } from "../models/CTPDTModel.js";

export const getCTPDT = async (req, res) => {
  // const ctpdt = new CTPDTModel({
  //   MaPDT: 'PDT001',
  //   MaSP: 'MA001',
  //   MaHD: 'Sandalred039001',
  //   SoLuong: 0,
  //   ThanhTien: 0,
  // });
  // ctpdt.save();
  try {
    const CTPDTs = await CTPDTModel.find();
    console.log("CTPDTs", CTPDTs);
    res.status(200).json(CTPDTs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createCTPDT = async (req, res) => {
  try {
    const newCTPDT = req.body;

    const CTPDT = new CTPDTModel(newCTPDT);
    await CTPDT.save();

    res.status(200).json(CTPDT);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateCTPDT = async (req, res) => {
  try {
    const updateCTPDT = req.body;
    const ctpdt = await CTPDTModel.findOneAndUpdate(
      { _id: updateCTPDT._id },
      updateCTPDT,
      { new: true }
    );
    res.status(200).json(ctpdt);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
