import { INIT_STATE } from "../../constant";
import { showPhieuBaoHanhBanHangModal, hidePhieuBaoHanhBanHangModal, getType } from "../actions";

export default function PhieuBaoHanhBanHangModalReducers(
  state = INIT_STATE.PhieuBaoHanhBanHangModal,
  action
) {
  switch (action.type) {
    case getType(showPhieuBaoHanhBanHangModal):
      return {
        isShow: true,
      };
    case getType(hidePhieuBaoHanhBanHangModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
