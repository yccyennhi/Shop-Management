import { INIT_STATE } from "../../constant";
import {
  getPhieuBaoHanhs,
  getType,
  createPhieuBaoHanh,
  updatePhieuBaoHanh,
  deletePhieuBaoHanh,
} from "../actions";

export default function PhieuBaoHanhsReducer(state = INIT_STATE.PhieuBaoHanhs, action) {
  switch (action.type) {
    case getType(getPhieuBaoHanhs.getPhieuBaoHanhsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPhieuBaoHanhs.getPhieuBaoHanhsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPhieuBaoHanhs.getPhieuBaoHanhsFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(createPhieuBaoHanh.createPhieuBaoHanhSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updatePhieuBaoHanh.updatePhieuBaoHanhSuccess):
      return {
        ...state,
        data: state.data.map((PhieuBaoHanh) =>
          PhieuBaoHanh._id === action.payload._id ? action.payload : PhieuBaoHanh
        ),
      };
    case getType(deletePhieuBaoHanh.deletePhieuBaoHanhSuccess):
      return {
        ...state,
        data: state.data.filter(
          (PhieuBaoHanh) => PhieuBaoHanh._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
