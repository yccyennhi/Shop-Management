import { INIT_STATE } from "../../constant";
import {
  getSanPhams,
  getType,
  createSanPham,
  updateSanPham,
  deleteSanPham,
} from "../actions";

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
        isLoading: true,
        data: [...state.data, action.payload],
      };
    case getType(updateSanPham.updateSanPhamSuccess):
      return {
        ...state,
        isLoading: true,
        data: state.data.map((SanPham) =>
          SanPham._id === action.payload._id ? action.payload : SanPham
        ),
      };
    case getType(deleteSanPham.deleteSanPhamSuccess):
      return {
        ...state,
        isLoading: true,
        data: state.data.filter(
          (SanPham) => SanPham._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
