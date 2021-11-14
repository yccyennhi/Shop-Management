import { INIT_STATE } from "../../constant";
import { getKhachHangs, getType } from "../actions";

export default function KhachHangsReducer(state = INIT_STATE.KhachHangs, action) {
  switch (action.type) {
    case getType(getKhachHangs.getKhachHangsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getKhachHangs.getKhachHangsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getKhachHangs.getKhachHangsFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}