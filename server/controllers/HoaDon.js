import { HoaDonModel } from "../models/HoaDonModel.js";

export const getHoaDons = async (req, res) => {
  try {
    // const hoadon = new HoaDonModel({
    //   MaHD: "HD0001",
    //   MaSP: "Sandalred039001",
    //   MaNV: "NV001",
    //   MaKM: "",
    //   MaKH: "",
    //   DiemTru: 0,
    //   TongTienHang: 0,
    //   ThanhTien: 0,
    //   ThoiGian: new Date(),
    // });
    // hoadon.save();
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
