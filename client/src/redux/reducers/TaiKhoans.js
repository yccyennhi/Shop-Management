import { INIT_STATE } from "../../constant";
import { getTaiKhoans, getType } from "../actions";

export default function TaiKhoansReducer(state = INIT_STATE.TaiKhoans, action) {
  switch (action.type) {
    case getType(getTaiKhoans.getTaiKhoansRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getTaiKhoans.getTaiKhoansSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getTaiKhoans.getTaiKhoansFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}