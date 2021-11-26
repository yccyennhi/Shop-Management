import { CTPDTModel } from "../models/CTPDTModel.js";

export const getCTPDTs = async (req, res) => {
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
    console.log(newCTPDT);
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
