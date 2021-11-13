import { TaiKhoanModel } from "../models/TaiKhoanModel.js";

export const getTaiKhoan = async (req, res) => {
  try {
    const TaiKhoans = await TaiKhoanModel.find();
    console.log("TaiKhoans", TaiKhoans);
    res.status(200).json(TaiKhoans);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createTaiKhoan = async (req, res) => {
  try {
    const newTaiKhoan = req.body;

    const TaiKhoan = new TaiKhoanModel(newTaiKhoan);
    await TaiKhoan.save();

    res.status(200).json(TaiKhoan);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateTaiKhoan = async (req, res) => {
  try {
    const updateTaiKhoan = req.body;
    const TaiKhoan = await TaiKhoanModel.findOneAndUpdate(
      { _id: updateTaiKhoan._id },
      updateTaiKhoan,
      { new: true }
    );
    res.status(200).json(TaiKhoan);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
