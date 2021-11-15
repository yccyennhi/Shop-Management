import { INIT_STATE } from "../../constant";
import { getSanPhams, getType, createSanPham } from "../actions";

export default function SanPhamsReducer(state = INIT_STATE.SanPhams, action) {
  switch (action.type) {
    case getType(getSanPhams.getSanPhamsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getSanPhams.getSanPhamsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getSanPhams.getSanPhamsFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(createSanPham.createSanPhamSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    default:
      return state;
  }
}
