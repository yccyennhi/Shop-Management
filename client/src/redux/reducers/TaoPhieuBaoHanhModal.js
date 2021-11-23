import { INIT_STATE } from "../../constant";
import { showTaoPhieuBaoHanhModal, hideTaoPhieuBaoHanhModal, getType } from "../actions";

export default function TaoPhieuBaoHanhModalReducers(
  state = INIT_STATE.TaoPhieuBaoHanhModal,
  action
) {
  switch (action.type) {
    case getType(showTaoPhieuBaoHanhModal):
      return {
        isShow: true,
      };
    case getType(hideTaoPhieuBaoHanhModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
