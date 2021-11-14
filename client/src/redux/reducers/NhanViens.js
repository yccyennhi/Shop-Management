import { INIT_STATE } from "../../constant";
import { getNhanViens, getType } from "../actions";

export default function NhanViensReducer(state = INIT_STATE.NhanViens, action) {
  switch (action.type) {
    case getType(getNhanViens.getNhanViensRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getNhanViens.getNhanViensSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getNhanViens.getNhanViensFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}