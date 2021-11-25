import { INIT_STATE } from "../../constant";
import { createCTHD, getCTHDs, getType } from "../actions";
import { messageSuccess, messageError } from "../../components/message";

export default function CTHDsReducer(state = INIT_STATE.CTHDs, action) {
  switch (action.type) {
    case getType(getCTHDs.getCTHDsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getCTHDs.getCTHDsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getCTHDs.getCTHDsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createCTHD.createCTHDSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(createCTHD.createCTHDFailure):
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
