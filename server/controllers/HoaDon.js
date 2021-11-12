import { HoaDonModel } from "../models/HoaDonModel";

export const getHoaDon = async (req, res) => {
  try {
    const HoaDons = await HoaDonModel.find();
    console.log("HoaDons", HoaDons);
    res.status(200).json(HoaDons);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createHoaDon = async (req, res) => {
  try {
    const newHoaDon = req.body;

    const HoaDon = new HoaDonModel(newHoaDon);
    await HoaDon.save();

    res.status(200).json(HoaDon);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateHoadon = async (req, res) => {
  try {
    const updateHoaDon = req.body;
    const hoadon = await HoaDonModel.findOneAndUpdate(
      { _id: updateHoaDon._id },
      updateHoaDon,
      { new: true }
    );
    res.status(200).json(hoadon);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
