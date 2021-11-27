import { INIT_STATE } from "../../constant";
import { getType, getPhieuDoiTras, createPhieuDoiTra } from "../actions";
import { messageSuccess, messageError } from "../../components/message";

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
    case getType(createPhieuDoiTra.createPhieuDoiTraSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(createPhieuDoiTra.createPhieuDoiTraFailure):
      messageError(action.payload);
      return {
        ...state,
        isLoading: true,
        data: [...state.data],
      };
    default:
      return state;
  }
}