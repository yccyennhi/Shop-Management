import { combineReducers } from "redux";
import KhachHangs from "./KhachHangs";
import NhanViens from "./NhanViens";
import SanPhams from "./SanPhams";
import TaiKhoans from "./TaiKhoans";
<<<<<<< Updated upstream
import Modal from './Modal';
=======
import TaoSanPhamModal from "./TaoSanPhamModal";
>>>>>>> Stashed changes

import KhuyenMais from "./KhuyenMais";

export default combineReducers({
  KhachHangs,
  NhanViens,
  SanPhams,
  TaiKhoans,
<<<<<<< Updated upstream
  Modal,
  KhuyenMais
});
=======
  TaoSanPhamModal,
  KhuyenMais,
});
>>>>>>> Stashed changes
