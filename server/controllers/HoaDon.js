import { HoaDonModel } from "../models/HoaDonModel.js";
import { KhuyenMaiModel } from "../models/KhuyenMaiModel.js";
import { SanPhamModel } from "../models/SanPhamModel.js";
import { PhieuBaoHanhModel } from "../models/PhieuBaoHanhModel.js";
import { Modal } from "antd";

import moment from "moment";

export const getHoaDons = async (req, res) => {
  try {
    // const HD = new HoaDonModel({
    //   MaHD: "HD006",
    //   ThoiGian: '2021/12/01',
    //   MaNV: "NV001",
    //   idNV: "618f87add7f3f02b3fe340d5",
    //   idKM: "619efcec8c13dc80932e4f44",
    //   MaKM: "KM004",
    //   idKH: "61957aa9e198c2fe3f3f53f6",
    //   MaKH: "KH000",
    //   DiemTru: 0,
    //   GiamGia: 112000,
    //   SoLuong: 3,
    //   GiaVon: 45449,
    //   TongTienHang: 1120000,
    //   ThanhTien: 1008000,
    //   TienKhachTra: 1100000,
    //   TienTraKhach: 92000,
    //   GhiChu: "",
    //   CTHD: [
    //     {
    //       idSP: "6190dcdea86eb32001319d39",
    //       MaSP: "MA001",
    //       TenSP: "Giày Sandals quai hậu da",
    //       SoLuong: 2,
    //       MauSac: "Nâu",
    //       Size: 39,
    //       GiaVon: 250000,
    //       DonGia: 320000,
    //       BaoHanh: "Không bảo hành",
    //       ThoiGian: '2021/11/27',
    //       ThanhTien: 640000,
    //     },
    //   ],
    // });
    // await HD.save();
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
    const KM = await KhuyenMaiModel.findOne({ _id: HoaDon.idKM });
    KM.SoLuong -= 1;
    if (KM.SoLuong === 0) KM.TrangThai = false;
    console.log(KM);
    const KhuyenMai = await KhuyenMaiModel.findOneAndUpdate(
      { _id: KM._id },
      KM,
      { new: true }
    );
    HoaDon.CTHD.map(async (CTHD) => {
      const SP = await SanPhamModel.findOne({ _id: CTHD.idSP });
      SP.TonKho = SP.TonKho - CTHD.SoLuong;
      if (SP.SoLuong === 0 && SP.TrangThai === "Đang kinh doanh")
        SP.TrangThai = "Hết hàng";
      const SanPham = await SanPhamModel.findOneAndUpdate({ _id: SP._id }, SP, {
        new: true,
      });

      //TaoPBH
      if (CTHD.BaoHanh == "Có bảo hành") {
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
          console.log(dataPBH);
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
