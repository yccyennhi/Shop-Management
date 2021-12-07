import { INIT_STATE } from "../../constant";
import { showThanhToanTichDiemModal, hideThanhToanTichDiemModal, getType } from "../actions";

export default function ThanhToanTichDiemModalReducers(
  state = INIT_STATE.ThanhToanTichDiemModal,
  action
) {
  switch (action.type) {
    case getType(showThanhToanTichDiemModal):
      return {
        isShow: true,
      };
    case getType(hideThanhToanTichDiemModal):
      return {
        isShow: false,
      };
    default:
      return state;
  }
}
