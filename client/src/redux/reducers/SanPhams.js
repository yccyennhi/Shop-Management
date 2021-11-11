import { INIT_STATE } from "../../constant";
import { getSanPhams, getType } from "../actions";

export default function SanPhamsReducer(state = INIT_STATE.SanPhams, action) {
  switch (action.type) {
    case getType(getSanPhams.getSanPhamsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getSanPhams.getSanPhamsSuccess):
      return {
        ...state,
        isLoading: false,
      };
    case getType(getSanPhams.getSanPhamsFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
