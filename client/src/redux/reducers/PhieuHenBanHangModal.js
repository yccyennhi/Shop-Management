import { INIT_STATE } from "../../constant";
import { showPhieuHenBanHangModal, hidePhieuHenBanHangModal, getType } from "../actions";

export default function PhieuHenBanHangModalReducers(
  state = INIT_STATE.PhieuHenBanHangModal,
  action
) {
  switch (action.type) {
    case getType(showPhieuHenBanHangModal):
      return {
        isShow: true,
      };
    case getType(hidePhieuHenBanHangModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
