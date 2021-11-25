import { INIT_STATE } from "../../constant";
import { getHoaDons, getType, createHoaDon } from "../actions";
import { messageSuccess, messageError } from "../../components/message";

export default function HoaDonsReducer(state = INIT_STATE.HoaDons, action) {
  switch (action.type) {
    case getType(getHoaDons.getHoaDonsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getHoaDons.getHoaDonsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getHoaDons.getHoaDonsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createHoaDon.createHoaDonSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(createHoaDon.createHoaDonFailure):
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
