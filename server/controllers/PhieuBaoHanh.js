import { PhieuBaoHanhModel } from "../models/PhieuBaoHanhModel.js";

export const getPhieuBaoHanhs = async (req, res) => {
  try {
    const PhieuBaoHanhs = await PhieuBaoHanhModel.find();
    console.log("PhieuBaoHanhs", PhieuBaoHanhs);
    res.status(200).json(PhieuBaoHanhs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPhieuBaoHanh = async (req, res) => {
  try {
    const newPhieuBaoHanh = req.body;
    const PhieuBaoHanh = new PhieuBaoHanhModel(newPhieuBaoHanh);
    await PhieuBaoHanh.save();
    res.status(200).json(PhieuBaoHanh);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const updatePhieuBaoHanh = async (req, res) => {
  try {
    const updatePhieuBaoHanh = req.body;

    const PhieuBaoHanh = await PhieuBaoHanhModel.findOneAndUpdate(
      { _id: updatePhieuBaoHanh._id },
      updatePhieuBaoHanh,
      { new: true }
    );
    res.status(200).json(PhieuBaoHanh);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};


export const deletePhieuBaoHanh = async (req, res) => {
  try {
    const {id} = req.params;

    const PhieuBaoHanh = await PhieuBaoHanhModel.findByIdAndRemove(id);
    res.status(200).json(PhieuBaoHanh);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
