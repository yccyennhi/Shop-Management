import { combineReducers } from "redux";
import KhachHangs from "./KhachHangs";
import NhanViens from "./NhanViens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
import HoaDons from "./HoaDons";
import KhuyenMais from "./KhuyenMais";
import CTHDs from "./CTHDs";
import PhieuDoiTras from "./PhieuDoiTras";

export default combineReducers({
  KhachHangs,
  NhanViens,
  SanPhams,
  TaiKhoans,
  HoaDons,
  KhuyenMais,
  CTHDs,
  PhieuDoiTras,
});
