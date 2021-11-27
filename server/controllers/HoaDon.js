import { HoaDonModel } from "../models/HoaDonModel.js";
import { KhuyenMaiModel } from "../models/KhuyenMaiModel.js";
import moment from "moment";

export const getHoaDons = async (req, res) => {
  try {
    // const newHoaDon = new HoaDonModel({
    //   MaHD: "HD002",
    //   ThoiGian: moment(),
    //   idNV: "618f87add7f3f02b3fe340d5",
    //   MaNV: "NV001",
    //   idKM:"619b0199e5bdcf1b7b54ce5c",
    //   MaKM: "KM001",
    //   idKH: "61957aa9e198c2fe3f3f53f6",
    //   MaKH: "KH005",
    //   DiemTru: 5,
    //   GiamGia: 0,
    //   SoLuong: 6,
    //   GiaVon: 500000,
    //   TongTienHang: 1000000,
    //   ThanhTien: 1000000,
    //   TienKhachTra: 1000000,
    //   TienTraKhach: 0,       
    // });

    // await newHoaDon.save();
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
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const updateHoaDon = async (req, res) => {
  try {
    const updateHoaDon = req.body;
    const hoadon = await HoaDonModel.findOneAndUpdate(
      { _id: updateHoaDon._id },
      updateHoaDon,
      { new: true }
    );
    res.status(200).json(hoadon);

    const KM = await KhuyenMaiModel.findOne({_id: HoaDon.idKM});
    KM.SoLuong -= 1;
    if (KM.SoLuong === 0) KM.TrangThai = false;
    const KhuyenMai = await KhuyenMaiModel.findOneAndUpdate(
      { _id: KM._id },
      KM,
      { new: true }
    );
    res.status(200).json(KhuyenMai);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
