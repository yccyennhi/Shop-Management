import { combineReducers } from "redux";
import KhachHangs from "./KhachHangs";
import NhanViens from "./NhanViens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
import HoaDons from "./HoaDons";
import KhuyenMais from './KhuyenMais'
import Modal from './Modal';
import TaoSanPhamModal from "./TaoSanPhamModal";
import PhieuBaoHanhs from "./PhieuBaoHanhs.js";
import PhieuHens from "./PhieuHens";
import PhieuDoiTras  from "./PhieuDoiTras";
import TaoHoaDonModal from "./TaoHoaDonModal";
import TaoPhieuTraHangModal  from "./TaoPhieuTraHangModal";
import TaoPhieuBaoHanhModal  from "./TaoPhieuBaoHanhModal";
import TaoPhieuHenModal  from "./TaoPhieuHenModal";
import CTHDs from "./CTHDs";
import CTPDTs from "./CTPDTs";
import TongQuans from "./TongQuans";
import CuoiNgays from "./CuoiNgays";

export default combineReducers({
  KhachHangs,
  NhanViens,
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
  CuoiNgays
});
