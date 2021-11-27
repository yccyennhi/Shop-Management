import { CTHDModel } from "../models/CTHDModel.js";

export const getCTHDs = async (req, res) => {
  try {
    const CTHDs = await CTHDModel.find();
    res.status(200).json(CTHDs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createCTHD = async (req, res) => {
  try {
    const newCTHD = req.body;
    const CTHD = new CTHDModel(newCTHD);
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
