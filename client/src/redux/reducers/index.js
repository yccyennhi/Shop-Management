import { combineReducers } from "redux";
import KhachHangs from "./KhachHangs";
import NhanViens from "./NhanViens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
import HoaDons from './HoaDons'
import PhieuDoiTras from './PhieuDoiTras'
import Modal from './Modal';
//import CTHDs from './CTHDs';
import KhuyenMais from './KhuyenMais';

export default combineReducers({
  KhachHangs,
  NhanViens,
  SanPhams,
  TaiKhoans,
  Modal,
  KhuyenMais,
  HoaDons,
  PhieuDoiTras,
  // CTHDs,
});