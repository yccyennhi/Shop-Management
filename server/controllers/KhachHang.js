import { KhachHangModel } from "../models/KhachHangModel.js";

export const getKhachHang = async (req, res) => {
  try {
    const KhachHangs = await KhachHangModel.find().then((KhachHangs) =>
      KhachHangs.filter((KhachHang) => KhachHang.MaKH != "Không")
    );

    res.status(200).json(KhachHangs);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createKhachHang = async (req, res) => {
  try {
    const newKhachHang = req.body;

    const KhachHang = new KhachHangModel(newKhachHang);
    await KhachHang.save();
    res.status(200).json(KhachHang);
  } catch (err) {
    res.status(500).json({ error: err });
    next();
  }
};

export const updateKhachHang = async (req, res) => {
  try {
    const updateKhachHang = req.body;

    const KhachHang = await KhachHangModel.findOneAndUpdate(
      { _id: updateKhachHang._id },
      updateKhachHang,
      { new: true }
    );
    res.status(200).json(KhachHang);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
