import { INIT_STATE } from "../../constant";
import { getCuoiNgays,getType } from "../actions";

export default function CuoiNgaysReducer(
    state = INIT_STATE.CuoiNgays,
    action
  ) {
    switch (action.type) {
      case getType(getCuoiNgays.getCuoiNgaysRequest):
        return {
          ...state,
          isLoading: true,
        };
      case getType(getCuoiNgays.getCuoiNgaysSuccess):
        return {
          ...state,
          isLoading: true,
          data: action.payload,
        };
      case getType(getCuoiNgays.getCuoiNgaysFailure):
        return {
          ...state,
          isLoading: false,
        };
        
    default:
        return state;
    }}