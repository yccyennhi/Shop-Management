import { INIT_STATE } from "../../constant";
import { getBCBanHangs,getType } from "../actions";

export default function BCBanHangsReducer(
    state = INIT_STATE.BCBanHangs,
    action
  ) {
    switch (action.type) {
      case getType(getBCBanHangs.getBCBanHangsRequest):
        return {
          ...state,
          isLoading: true,
        };
      case getType(getBCBanHangs.getBCBanHangsSuccess):
        return {
          ...state,
          isLoading: true,
          data: action.payload,
        };
      case getType(getBCBanHangs.getBCBanHangsFailure):
        return {
          ...state,
          isLoading: false,
        };
        
    default:
        return state;
    }}