import { INIT_STATE } from "../../constant";
import { showUpdateSanPhamModal, hideUpdateSanPhamModal, getType } from "../actions";

export default function UpdateSanPhamModalReducers(
  state = INIT_STATE.UpdateSanPhamModal,
  action
) {
  switch (action.type) {
    case getType(showUpdateSanPhamModal):
      return {
        isShow: true,
      };
    case getType(hideUpdateSanPhamModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
