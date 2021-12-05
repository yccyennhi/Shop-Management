import { INIT_STATE } from "../../constant";
import { setArrHangHoaNhap, getType } from "../actions";

export default function ArrHangHoaNhapReducers(
  state = INIT_STATE.ArrHangHoaNhap,
  action
) {
  switch (action.type) {
    case getType(setArrHangHoaNhap):
      return {
        arr: action,
      };

    default:
      return state;
  }
}
