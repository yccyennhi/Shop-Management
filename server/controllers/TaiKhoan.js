import { TaiKhoanModel } from "../models/TaiKhoanModel.js";
import { NhanVienModel } from "../models/NhanVienModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const isTaiKhoanLoggedIn = async (req, res) => {
  try {
    const id = req.TaiKhoanId;
    const TaiKhoan = await TaiKhoanModel.findById(id);
    if (!TaiKhoan) {
      return res
        .status(400)
        .json({ success: false, message: "Không tìm thấy tài khoản" });
    }

    return res.status(200).json({ success: true, TaiKhoan });
  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

export const login = async (req, res) => {
  try {
    const { TenTK, MatKhau } = req.body;

    if (!TenTK || !MatKhau) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu tài khoản hoặc mật khẩu" });
    }

    const NhanVien = await NhanVienModel.findOne({ MaNV: TenTK });

    if (NhanVien) {
      if (!NhanVien.TrangThai) {
        return res.status(400).json({
          success: false,
          message: "Người dùng đã nghỉ làm",
        });
      }
    }

    const TaiKhoan = await TaiKhoanModel.findOne({ TenTK: TenTK });

    if (!TaiKhoan) {
      return res.status(400).json({
        success: false,
        message: "Tên tài khoản hoặc mật khẩu không đúng",
      });
    }

    const passwordValid = await argon2.verify(TaiKhoan.MatKhau, MatKhau);
    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Tên tài khoản hoặc mật khẩu không đúng",
      });
    }

    const accessToken = jwt.sign({ TaiKhoanId: TaiKhoan._id }, "NLMT");

    res.status(200).json({ success: true, message: "Logged in", accessToken });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const getTaiKhoan = async (req, res) => {
  console.log("getTaiKhoan");
  try {
    const TaiKhoans = await TaiKhoanModel.find();
    console.log("TaiKhoans", TaiKhoans);
    res.status(200).json(TaiKhoans);
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const createTaiKhoan = async (req, res) => {
  try {
    const { TenTK, MatKhau } = req.body;

    if (!TenTK || !MatKhau) {
      return res
        .status(400)
        .json({ success: false, message: "Thiếu tài khoản hoặc mật khẩu" });
    }

    const NhanVien = await NhanVienModel.findOne({ MaNV: TenTK });

    if (!NhanVien) {
      return res
        .status(400)
        .json({ success: false, message: "Không tồn tại nhân viên" });
    }

    const TaiKhoan = await TaiKhoanModel.findOne({ TenTK: TenTK });

    if (TaiKhoan) {
      return res
        .status(400)
        .json({ success: false, message: "Tên tài khoản đã tồn tại" });
    }

    const hashedMatKhau = await argon2.hash(MatKhau);
    const newTaiKhoan = new TaiKhoanModel({
      MaNV: NhanVien._id,
      TenTK: TenTK,
      MatKhau: hashedMatKhau,
    });
    await newTaiKhoan.save();

    const accessToken = jwt.sign({ TaiKhoanId: newTaiKhoan._id }, "NLMT");

    res.status(200).json({ success: true, message: "Created", accessToken });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};

export const updateTaiKhoan = async (req, res) => {
  try {
    const { TenTK, MatKhau, newMatKhau, confirmedMatKhau } = req.body;

    if (!TenTK || !MatKhau || !newMatKhau || !confirmedMatKhau) {
      return res.status(400).send("Thiếu tài khoản hoặc mật khẩu");
    }

    if (newMatKhau !== confirmedMatKhau) {
      return res.status(400).send("Xác nhận mật khẩu không đúng");
    }

    const TaiKhoan = await TaiKhoanModel.findOne({ TenTK: TenTK });

    if (!TaiKhoan) {
      return res.status(400).send("Tên tài khoản hoặc mật khẩu không đúng");
    }

    const passwordValid = await argon2.verify(TaiKhoan.MatKhau, MatKhau);
    if (!passwordValid && TaiKhoan.MatKhau !== MatKhau) {
      return res.status(400).send("Mật khẩu không đúng");
    }

    const hashedMatKhau = await argon2.hash(newMatKhau);

    TaiKhoan.MatKhau = hashedMatKhau;
    await TaiKhoan.save();

    res.status(200).json(TaiKhoan);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
