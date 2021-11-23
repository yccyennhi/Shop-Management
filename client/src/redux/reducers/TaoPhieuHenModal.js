import { INIT_STATE } from "../../constant";
import { showTaoPhieuHenModal, hideTaoPhieuHenModal, getType } from "../actions";

export default function TaoPhieuHenModalReducers(
  state = INIT_STATE.TaoPhieuHenModal,
  action
) {
  switch (action.type) {
    case getType(showTaoPhieuHenModal):
      return {
        isShow: true,
      };
    case getType(hideTaoPhieuHenModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
