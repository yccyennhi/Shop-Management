import { HoaDonModel } from "../models/HoaDonModel.js";
import { KhuyenMaiModel } from "../models/KhuyenMaiModel.js";
import { SanPhamModel } from "../models/SanPhamModel.js";
import { PhieuBaoHanhModel } from "../models/PhieuBaoHanhModel.js";
import { Modal } from "antd";

import moment from "moment";
import { KhachHangModel } from "../models/KhachHangModel.js";

export const getHoaDons = async (req, res) => {
  try {
    const HoaDons = await HoaDonModel.find();

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

    if (HoaDon.MaKM != "KM000") {
      const KM = await KhuyenMaiModel.findOne({ _id: HoaDon.idKM });
      if (KM.SoLuong > 0) {
        KM.SoLuong -= 1;
        if (KM.SoLuong === 0) KM.TrangThai = false;
        await KhuyenMaiModel.findOneAndUpdate({ _id: KM._id }, KM, {
          new: true,
        });
      }
    }

    if (HoaDon.MaKH != "61b769ba26b4dbbca417c4de") {
      const KH = await KhachHangModel.findOne({ MaKH: HoaDon.MaKH });
      if (KH != undefined) {
        KH.DiemTichLuy =
          KH.DiemTichLuy - HoaDon.DiemTru + parseInt(HoaDon.ThanhTien / 100);
        await KhachHangModel.findOneAndUpdate({ _id: KH._id }, KH, {
          new: true,
        });
      }
    }
    HoaDon.CTHD.map(async (CTHD) => {
      const SP = await SanPhamModel.findOne({ _id: CTHD.idSP });
      SP.TonKho = SP.TonKho - CTHD.SoLuong;
      if (SP.TonKho === 0) SP.TrangThai = "Hết hàng";
      await SanPhamModel.findOneAndUpdate({ _id: SP._id }, SP, {
        new: true,
      });

      //TaoPBH
      if (CTHD.BaoHanh > 0) {
        console.log(CTHD);
        for (let i = 0; i < CTHD.SoLuong; i++) {
          let Ma = "";
          let SPBH;
          do {
            const min = 1000000;
            const max = 9999999;
            const rand = min + Math.random() * (max - min);
            Ma = "PBH" + Math.round(rand);
            console.log("Ma:", Ma);
            SPBH = await PhieuBaoHanhModel.findOne({ MaPBH: Ma });
            console.log(SPBH);
          } while (SPBH !== null);
          moment.addRealMonth = function addRealMonth(d) {
            var fm = moment(d).add(SP.ThoiGianBaoHanh, "M");
            var fmEnd = moment(fm).endOf("month");
            return d.date() != fm.date() &&
              fm.isSame(fmEnd.format("YYYY-MM-DD"))
              ? fm.add(1, "d")
              : fm;
          };
          var nextMonth = moment.addRealMonth(moment(CTHD.createdAt));
          const dataPBH = {
            MaPBH: Ma,
            MaHD: HoaDon.MaHD,
            MaSP: CTHD.MaSP,
            NgayBD: moment(CTHD.createdAt),
            NgayKT: nextMonth,
          };
          const PhieuBaoHanh = new PhieuBaoHanhModel(dataPBH);
          console.log("datapbh", dataPBH);
          await PhieuBaoHanh.save();
        }
      }
    });
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
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateSLKM = async (req, res) => {
  try {
    const KM = await KhuyenMaiModel.findOne({ _id: req.body.idKM });
    KM.SoLuong -= 1;
    if (KM.SoLuong === 0) KM.TrangThai = false;
    console.log(KM);
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
