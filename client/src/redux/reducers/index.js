import { combineReducers } from "redux";
import CTHDs from "./CTHDs";
import CTPDTs from "./CTPDTs";
import HoaDons from "./HoaDons";
import KhachHangModal from "./KhachHangModal";
import KhachHangs from "./KhachHangs";
import KhuyenMais from "./KhuyenMais";
import Modal from "./Modal";
import NhanVienModal from "./NhanVienModal";
import NhanViens from "./NhanViens";
import PhieuBaoHanhs from "./PhieuBaoHanhs.js";
import PhieuDoiTras from "./PhieuDoiTras";
import PhieuHens from "./PhieuHens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
import TaoHoaDonModal from "./TaoHoaDonModal";
import TaoPhieuBaoHanhModal from "./TaoPhieuBaoHanhModal";
import TaoPhieuHenModal from "./TaoPhieuHenModal";
import TaoPhieuTraHangModal from "./TaoPhieuTraHangModal";
import TaoSanPhamModal from "./TaoSanPhamModal";
import TongQuans from "./TongQuans";
import CuoiNgays from "./CuoiNgays";
import BCBanHangs from "./BCBanHangs";
import BCHangHoas from "./BCHangHoas";
import PhieuNhaps from "./PhieuNhaps";
import TaoPhieuNhapModal  from "./TaoPhieuNhapModal";
import ThemPhieuNhapPage  from "./ThemPhieuNhapPage";
import PhieuBaoHanhBanHangModal  from "./PhieuBaoHanhBanHangModal";
import PhieuHenBanHangModal  from "./PhieuHenBanHangModal";
import ArrHangHoaNhap  from "./ArrHangHoaNhap";

export default combineReducers({
  KhachHangs,
  KhachHangModal,
  NhanViens,
  NhanVienModal,
  SanPhams,
  TaiKhoans,
  KhuyenMais,
  HoaDons,
  Modal,
  TaoSanPhamModal,
  PhieuBaoHanhs,
  PhieuHens,
  PhieuDoiTras,
  TaoHoaDonModal,
  TaoPhieuTraHangModal,
  TaoPhieuBaoHanhModal,
  TaoPhieuHenModal,
  CTHDs,
  CTPDTs,
  TongQuans,
  CuoiNgays,
  BCBanHangs,
  BCHangHoas,
  PhieuNhaps,
  TaoPhieuNhapModal,
  ThemPhieuNhapPage,
  PhieuBaoHanhBanHangModal,
  PhieuHenBanHangModal,
  ArrHangHoaNhap,
});
