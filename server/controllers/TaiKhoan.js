import { TaiKhoanModel } from "../models/TaiKhoanModel.js";

export const getTaiKhoan = async (req, res) => {
  try {
    const TaiKhoans = await TaiKhoanModel.find();

    res.status(200).json(TaiKhoans);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createTaiKhoan = async (req, res) => {
  try {
    const newTaiKhoan = req.body;
    const newMaTK = req.body;

    const check = await TaiKhoanModel.findOne({ newMaTK });

    if (check) {
      res.status(400).send("Đã tồn tại mã trong hệ thống");
      next();
    } else {
      const TaiKhoan = new TaiKhoanModel(newTaiKhoan);
      await TaiKhoan.save();

      res.status(200).json(TaiKhoan);
    }
  } catch (err) {
    res.status(500).json({ error: err });
    next();
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
