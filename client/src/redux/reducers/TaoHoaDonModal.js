import { INIT_STATE } from "../../constant";
import { showTaoHoaDonModal, hideTaoHoaDonModal, getType } from "../actions";

export default function TaoHoaDonModalReducers(
  state = INIT_STATE.TaoHoaDonModal,
  action
) {
  switch (action.type) {
    case getType(showTaoHoaDonModal):
      return {
        isShow: true,
      };
    case getType(hideTaoHoaDonModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
