import { INIT_STATE } from "../../constant";
import { setIdThemPhieuNhapPage, getType } from "../actions";

export default function ThemPhieuNhapPageReducers(
  state = INIT_STATE.ThemPhieuNhapPage,
  action
) {
  switch (action.type) {
    case getType(setIdThemPhieuNhapPage):
      return {
        ID: action,
      };

    default:
      return state;
  }
}
