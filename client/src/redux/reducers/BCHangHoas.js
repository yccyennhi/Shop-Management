import { INIT_STATE } from "../../constant";
import { getBCHangHoas,getType } from "../actions";

export default function BCHangHoasReducer(
    state = INIT_STATE.BCHangHoas,
    action
  ) {
    switch (action.type) {
      case getType(getBCHangHoas.getBCHangHoasRequest):
        return {
          ...state,
          isLoading: true,
        };
      case getType(getBCHangHoas.getBCHangHoasSuccess):
        return {
          ...state,
          isLoading: true,
          data: action.payload,
        };
      case getType(getBCHangHoas.getBCHangHoasFailure):
        return {
          ...state,
          isLoading: false,
        };
        
    default:
        return state;
    }}