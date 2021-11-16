import { PhieuHenModel } from "../models/PhieuHenModel.js";

export const getPhieuHens = async (req, res) => {
  try {
    const PhieuHens = await PhieuHenModel.find();
    console.log("PhieuHens", PhieuHens);
    res.status(200).json(PhieuHens);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPhieuHen = async (req, res) => {
  try {
    const newPhieuHen = req.body;
    const PhieuHen = new PhieuHenModel(newPhieuHen);
    await PhieuHen.save();
    res.status(200).json(PhieuHen);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const updatePhieuHen = async (req, res) => {
  try {
    const updatePhieuHen = req.body;

    const PhieuHen = await PhieuHenModel.findOneAndUpdate(
      { _id: updatePhieuHen._id },
      updatePhieuHen,
      { new: true }
    );
    res.status(200).json(PhieuHen);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};


export const deletePhieuHen = async (req, res) => {
  try {
    const {id} = req.params;

    const PhieuHen = await PhieuHenModel.findByIdAndRemove(id);
    res.status(200).json(PhieuHen);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};
