import { INIT_STATE } from "../../constant";
import { getType, showTaiKhoanModal, hideTaiKhoanModal } from "../actions";

export default function TaiKhoanModalReducers(
  state = INIT_STATE.TaiKhoanModal,
  action
) {
  switch (action.type) {
    case getType(showTaiKhoanModal):
      return {
        isShow: true,
      };
    case getType(hideTaiKhoanModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
