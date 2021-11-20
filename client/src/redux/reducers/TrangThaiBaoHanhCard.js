import { INIT_STATE } from "../../constant";
import {
  showTatCaTrangThai,
  showConHanTrangThai,
  showHetHanTrangThai,
  getType,
} from "../actions";

export default function TaoSanPhamModalReducers(
  state = INIT_STATE.TaoSanPhamModal,
  action
) {
  switch (action.type) {
    case getType(showTatCaTrangThai):
      return {
        isShow: 0,
      };
    case getType(showConHanTrangThai):
      return {
        isShow: 1,
      };
    case getType(showHetHanTrangThai):
      return {
        isShow: 2,
      };
    default:
      return state;
  }
}
