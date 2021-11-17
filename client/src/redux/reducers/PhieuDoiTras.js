import { INIT_STATE } from "../../constant";
import { PhieuDoiTras, getType, getPhieuDoiTras } from "../actions";

export default function PhieuDoiTrasReducer(state = INIT_STATE.PhieuDoiTras, action) {
  switch (action.type) {
    case getType(getPhieuDoiTras.getPhieuDoiTrasRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPhieuDoiTras.getPhieuDoiTrasSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPhieuDoiTras.getPhieuDoiTrasFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}