import { INIT_STATE } from "../../constant";
import { showTaoSanPhamModal, hideTaoSanPhamModal, getType } from "../actions";

export default function TaoSanPhamModalReducers(
  state = INIT_STATE.TaoSanPhamModal,
  action
) {
  switch (action.type) {
    case getType(showTaoSanPhamModal):
      return {
        isShow: true,
      };
    case getType(hideTaoSanPhamModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
