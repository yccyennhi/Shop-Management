import { INIT_STATE } from "../../constant";
import { getType, hideNhanVienModal, showNhanVienModal } from "../actions";

export default function NhanVienModalReducers(
  state = INIT_STATE.NhanVienModal,
  action
) {
  switch (action.type) {
    case getType(showNhanVienModal):
      return {
        isShow: true,
      };
    case getType(hideNhanVienModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
