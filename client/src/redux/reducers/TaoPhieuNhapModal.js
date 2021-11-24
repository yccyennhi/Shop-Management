import { INIT_STATE } from "../../constant";
import { showTaoPhieuNhapModal, hideTaoPhieuNhapModal, getType } from "../actions";

export default function TaoPhieuNhapModalReducers(
  state = INIT_STATE.TaoPhieuNhapModal,
  action
) {
  switch (action.type) {
    case getType(showTaoPhieuNhapModal):
      return {
        isShow: true,
      };
    case getType(hideTaoPhieuNhapModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
