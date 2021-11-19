import { HoaDonModel } from "../models/HoaDonModel.js";
import { KhuyenMaiModel } from "../models/KhuyenMaiModel.js";

export async function isNotExistHoaDon(idKhuyenMai) {
  const HoaDons = await HoaDonModel.find({ MaKM: idKhuyenMai });

  if (HoaDons.length) {
    return false;
  } else {
    return true;
  }
}

export const getKhuyenMais = async (req, res) => {
  try {
    const KhuyenMais = await KhuyenMaiModel.find();

    res.status(200).json(KhuyenMais);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createKhuyenMai = async (req, res, next) => {
  try {
    const newKhuyenMai = req.body;

    const { MaKM } = req.body;
    const getKhuyenMais = await KhuyenMaiModel.findOne({ MaKM });
    if (getKhuyenMais) {
        res.status(400).send({message:'Đã tồn tại mã'});
        next();
    } else {
      console.log('KM', newKhuyenMai);
      const KhuyenMai = new KhuyenMaiModel(newKhuyenMai);
      await KhuyenMai.save();
      res.status(200).json(KhuyenMai);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
    next();
  }
};

export const updateKhuyenMai = async (req, res) => {
  try {
    const updateKhuyenMai = req.body;

    const check = await isNotExistHoaDon(updateKhuyenMai._id);

    if (check) {
      const KhuyenMai = await KhuyenMaiModel.findOneAndUpdate(
        { _id: updateKhuyenMai._id },
        updateKhuyenMai,
        { new: true }
      );
      res.status(200).json(KhuyenMai);
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Đã tồn tại giao dịch" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const deleteKhuyenMai = async (req, res) => {
  try {
    const { id } = req.params;

    const check = await isNotExistHoaDon(id);

    if (check) {
      const KhuyenMai = await KhuyenMaiModel.findByIdAndRemove(id);
      res.status(200).json(KhuyenMai);
    } else {
      return res
        .status()
        .json({ success: false, message: "Đã tồn tại giao dịch" });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};
