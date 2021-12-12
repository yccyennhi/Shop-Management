import { messageError, messageSuccess } from "../../components/message";
import { INIT_STATE } from "../../constant";
import {
  createTaiKhoan,
  getTaiKhoans,
  getType,
  updateTaiKhoan,
} from "../actions";

export default function TaiKhoansReducer(state = INIT_STATE.TaiKhoans, action) {
  switch (action.type) {
    //#region get
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
    //#endregion

    //#region create
    case getType(createTaiKhoan.createTaiKhoanSuccess):
      messageSuccess("Thêm mới tài khoản thành công");
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
      };
    case getType(createTaiKhoan.createTaiKhoanFailure):
      messageError(action.payload);
      return {
        ...state,
        isLoading: false,
      };
    //#endregion

    //#region update
    case getType(updateTaiKhoan.updateTaiKhoanSuccess):
      messageSuccess("Cập nhật thành công");
      return {
        ...state,
        isLoading: false,
        data: state.data.map((TaiKhoan) =>
          TaiKhoan._id === action.payload._id ? action.payload : TaiKhoan
        ),
      };
    case getType(updateTaiKhoan.updateTaiKhoanFailure):
      messageError(action.payload);
      return {
        ...state,
        isLoading: false,
      };
    //#endregion

    default:
      return state;
  }
}
