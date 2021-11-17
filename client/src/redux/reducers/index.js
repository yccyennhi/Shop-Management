import { combineReducers } from "redux";
import KhachHangs from "./KhachHangs";
import NhanViens from "./NhanViens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
import Modal from './Modal';
import TaoSanPhamModal from "./TaoSanPhamModal";
import KhuyenMais from "./KhuyenMais";
import PhieuBaoHanhs from "./PhieuBaoHanhs.js";
import PhieuHens from "./PhieuHens";

export default combineReducers({
  KhachHangs,
  NhanViens,
  SanPhams,
  TaiKhoans,
  Modal,
  KhuyenMais,
  TaoSanPhamModal,
  PhieuBaoHanhs,
  PhieuHens,
});
