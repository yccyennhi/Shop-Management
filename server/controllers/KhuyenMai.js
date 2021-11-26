import { HoaDonModel } from "../models/HoaDonModel.js";
import { KhuyenMaiModel } from "../models/KhuyenMaiModel.js";
import moment from "moment";

export async function isNotExistHoaDon(idKhuyenMai) {
  const HoaDons = await HoaDonModel.find({ idKM: idKhuyenMai });
  console.log("HoaDon", HoaDons);
  if (HoaDons.length) {
    return false;
  } else {
    return true;
  }
}

export const getKhuyenMais = async (req, res) => {
  try {
    const today = moment().startOf("day");

    await KhuyenMaiModel.updateMany(
      {},
      [
        {
          $set: {
            TrangThai: {
              $cond: {
                if: { $gte: ["NgayKT", today] },
                then: "$TrangThai",
                else: false,
              },
            },
          },
        },
      ],
      { multi: true }
    );

    const KhuyenMais = await KhuyenMaiModel.find().then((KhuyenMais) =>
      KhuyenMais.filter((KhuyenMai) => KhuyenMai.MaKM != "KM000")
    );

    res.status(200).json(KhuyenMais);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createKhuyenMai = async (req, res, next) => {
  try {
    const newKhuyenMai = req.body;

    const KhuyenMai = new KhuyenMaiModel(newKhuyenMai);
    await KhuyenMai.save();
    res.status(200).json(KhuyenMai);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
    next();
  }
};

export const updateKhuyenMai = async (req, res, next) => {
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
      res.status(400).send("Đã tồn tại giao dịch. Không được chỉnh sửa");
      next();
    }
  } catch (err) {
    res.status(400).json({ error: err });
    next();
  }
};

export const deleteKhuyenMai = async (req, res, next) => {
  try {
   
    const { id } = req.params;
    const check = await isNotExistHoaDon(id); 
    if (check) {
      const KhuyenMai = await KhuyenMaiModel.findByIdAndRemove(id);
      res.status(200).json(KhuyenMai);
    } else {
      res.status(400).send("Đã tồn tại giao dịch. Không được xóa");
      next();
    }
  } catch (err) {
    res.status(400).json({ error: err });
    next();
  }
};
