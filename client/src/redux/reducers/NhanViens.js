import { messageError, messageSuccess } from "../../components/message";
import { INIT_STATE } from "../../constant";
import {
  createNhanVien,
  getNhanViens,
  getType,
  updateNhanVien,
} from "../actions";

export default function NhanViensReducer(state = INIT_STATE.NhanViens, action) {
  switch (action.type) {
    //#region get
    case getType(getNhanViens.getNhanViensRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getNhanViens.getNhanViensSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getNhanViens.getNhanViensFailure):
      return {
        ...state,
        isLoading: false,
      };
    //#endregion

    //#region create
    case getType(createNhanVien.createNhanVienSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        isLoading: false,
        data: [...state.data, action.payload],
      };
    case getType(createNhanVien.createNhanVienFailure):
      messageError(action.payload);
      return {
        ...state,
        isLoading: false,
      };
    //#endregion

    //#region update
    case getType(updateNhanVien.updateNhanVienSuccess):
      messageSuccess("Chỉnh sửa thành công");
      return {
        ...state,
        isLoading: false,
        data: state.data.map((NhanVien) =>
          NhanVien._id === action.payload._id ? action.payload : NhanVien
        ),
      };
    case getType(updateNhanVien.updateNhanVienFailure):
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
