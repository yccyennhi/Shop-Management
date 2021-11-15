import { PhieuDoiTraModel } from "../models/PhieuDoiTraModel.js";

export const getPhieuDoiTras = async (req, res) => {
  // const phieudoitra = new PhieuDoiTraModel({
  //   MaPDT: "PDT001",
  //   MaHD: "HD0001",
  //   MaNV: 'NV001',
  //   ThoiGian: new Date(),
  // });
  // phieudoitra.save();
  try {
    const PhieuDoiTras = await PhieuDoiTraModel.find();
    console.log("PhieuDoiTras", PhieuDoiTras);
    res.status(200).json(PhieuDoiTras);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createPhieuDoiTra = async (req, res) => {
  try {
    const newPhieuDoiTra = req.body;

    const PhieuDoiTra = new PhieuDoiTraModel(newPhieuDoiTra);
    await PhieuDoiTra.save();

    res.status(200).json(PhieuDoiTra);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePhieuDoiTra = async (req, res) => {
  try {
    const updatePhieuDoiTra = req.body;
    const phieudoitra = await PhieuDoiTraModel.findOneAndUpdate(
      { _id: updatePhieuDoiTra._id },
      updatePhieuDoiTra,
      { new: true }
    );
    res.status(200).json(phieudoitra);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
