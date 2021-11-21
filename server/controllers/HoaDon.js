import { HoaDonModel } from "../models/HoaDonModel.js";
import moment from "moment";

export const getHoaDons = async (req, res) => {
  try {
    const newHoaDon = new HoaDonModel({
      MaHD: "HD003",
      ThoiGian: moment(),
      idNV: "618f87add7f3f02b3fe340d5",
      idKM: "618f5168430731ecab82f463",
      idKH: "618f8091bfd363a172798a6b",
      MaKH: "KH001",
      MaKM: "KM001",
      MaNV: "NV001",
      GiamGia: 0,
      TienKhachTra: 500000,
      SoLuong: 2,
      TienTraKhach: 200000,
      DiemTru: 5,
      TongTienHang: 150000,
      ThanhTien: 350000,
    });

    await newHoaDon.save();
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
