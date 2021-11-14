import { INIT_STATE } from "../../constant";
import { getKhuyenMais, getType } from "../actions";

export default function KhuyenMaisReducer(state = INIT_STATE.KhuyenMais, action) {
  switch (action.type) {
    case getType(getKhuyenMais.getKhuyenMaisRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getKhuyenMais.getKhuyenMaisSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getKhuyenMais.getKhuyenMaisFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
