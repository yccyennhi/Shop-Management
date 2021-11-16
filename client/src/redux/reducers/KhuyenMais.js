import { INIT_STATE } from "../../constant";
import { getKhuyenMais, createKhuyenMai, updateKhuyenMai, getType } from "../actions";

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
      case getType(createKhuyenMai.createKhuyenMaiSuccess):
        return {
          ...state,
          data: [...state.data, action.payload],
        };
      case getType(updateKhuyenMai.updateKhuyenMaiSuccess):
          return {
            ...state,
            data: state.data.map((KhuyenMai) =>
              KhuyenMai._id === action.payload._id ? action.payload : KhuyenMai
            ),
          };
    default:
      return state;
  }
}
