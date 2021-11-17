import { INIT_STATE } from "../../constant";
import { getCTPDTs, getType } from "../actions";

export default function CTPDTsReducer(state = INIT_STATE.CTPDTs, action) {
  switch (action.type) {
    case getType(getCTPDTs.getCTPDTsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getCTPDTs.getCTPDTSuccess):
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
    default:
      return state;
  }
}