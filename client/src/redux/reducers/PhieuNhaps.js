import { INIT_STATE } from "../../constant";
import {
  getPhieuNhaps,
  getType,
  createPhieuNhap,
  updatePhieuNhap,
  deletePhieuNhap,
} from "../actions";
import { messageSuccess, messageError } from "../../components/message";

export default function PhieuNhapsReducer(state = INIT_STATE.PhieuNhaps, action) {
  switch (action.type) {
    case getType(getPhieuNhaps.getPhieuNhapsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPhieuNhaps.getPhieuNhapsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPhieuNhaps.getPhieuNhapsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createPhieuNhap.createPhieuNhapSuccess):
      messageSuccess("Thêm phiếu nhập thành công");
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updatePhieuNhap.updatePhieuNhapSuccess):
      return {
        ...state,
        data: state.data.map((PhieuNhap) =>
          PhieuNhap._id === action.payload._id ? action.payload : PhieuNhap
        ),
      };
    case getType(deletePhieuNhap.deletePhieuNhapSuccess):
      messageSuccess("Xóa phiếu nhập thành công");
      return {
        ...state,
        data: state.data.filter((PhieuNhap) => PhieuNhap._id !== action.payload),
      };
    default:
      return state;
  }
}
