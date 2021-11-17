import { INIT_STATE } from "../../constant";
import { showTaoPhieuTraHangModal, hideTaoPhieuTraHangModal, getType } from "../actions";

export default function TaoPhieuTraHangModalReducers(
  state = INIT_STATE.TaoPhieuTraHangModal,
  action
) {
  switch (action.type) {
    case getType(showTaoPhieuTraHangModal):
      return {
        isShow: true,
      };
    case getType(hideTaoPhieuTraHangModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
