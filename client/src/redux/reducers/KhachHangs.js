import { messageError, messageSuccess } from "../../components/message";
import { INIT_STATE } from "../../constant";
import {
  createKhachHang,
  getKhachHangs,
  getType,
  updateKhachHang,
} from "../actions";

export default function KhachHangsReducer(
  state = INIT_STATE.KhachHangs,
  action
) {
  switch (action.type) {
    //#region get
    case getType(getKhachHangs.getKhachHangsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getKhachHangs.getKhachHangsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getKhachHangs.getKhachHangsFailure):
      return {
        ...state,
        isLoading: false,
      };
    //#endregion

    //#region create
    // case getType(createKhachHang.createKhachHangRequest):
    //   return {
    //     ...state,
    //     isLoading: true,
    //     data: [...state.data, action.payload]
    //   };
    case getType(createKhachHang.createKhachHangSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
      };
    case getType(createKhachHang.createKhachHangFailure):
      messageError(action.payload);
      return {
        ...state,
        isLoading: false,
      };
    //#endregion

    //#region update
    case getType(updateKhachHang.updateKhachHangSuccess):
      messageSuccess("Chỉnh sửa thành công");
      return {
        ...state,
        isLoading: false,
        data: state.data.map((KhachHang) =>
          KhachHang._id === action.payload._id ? action.payload : KhachHang
        ),
      };
    case getType(updateKhachHang.updateKhachHangFailure):
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
