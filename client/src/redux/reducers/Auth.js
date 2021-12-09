import { messageError, messageSuccess } from "../../components/message";
import { INIT_STATE } from "../../constant";
import {
  getType,
  setAuth,
} from "../actions";

export default function AuthReducer(state, action) {
  const {
    type,
    payload: { isAuthenticated, TaiKhoan },
  } = action;

  switch (type) {
    case "SET_AUTH":
      return {
        ...state,
        authLoading: false,
        isAuthenticated,
        TaiKhoan,
      };
    default:
      return state;
  }
}
