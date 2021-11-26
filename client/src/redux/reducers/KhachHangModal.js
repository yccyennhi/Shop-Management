import { INIT_STATE } from "../../constant";
import { getType, hideKhachHangModal, showKhachHangModal } from "../actions";

export default function KhachHangModalReducers(
  state = INIT_STATE.KhachHangModal,
  action
) {
  switch (action.type) {
    case getType(showKhachHangModal):
      return {
        isShow: true,
      };
    case getType(hideKhachHangModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
