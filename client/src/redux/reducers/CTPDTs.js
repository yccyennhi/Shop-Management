import { INIT_STATE } from "../../constant";
import { getCTPDTs, getType, createCTPDT } from "../actions";
import { messageSuccess, messageError } from "../../components/message";

export default function CTPDTsReducer(state = INIT_STATE.CTPDTs, action) {
  switch (action.type) {
    case getType(getCTPDTs.getCTPDTsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getCTPDTs.getCTPDTsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getCTPDTs.getCTPDTsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createCTPDT.createCTPDTSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(createCTPDT.createCTPDTFailure):
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
