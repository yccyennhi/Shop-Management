import { INIT_STATE } from "../../constant";
import {
  getKhuyenMais,
  createKhuyenMai,
  updateKhuyenMai,
  deleteKhuyenMai,
  getType,
} from "../actions";
import { messageSuccess, messageError } from "../../components/message";

export default function KhuyenMaisReducer(
  state = INIT_STATE.KhuyenMais,
  action
) {
  switch (action.type) {
    case getType(getKhuyenMais.getKhuyenMaisRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getKhuyenMais.getKhuyenMaisSuccess):
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    case getType(getKhuyenMais.getKhuyenMaisFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createKhuyenMai.createKhuyenMaiSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(createKhuyenMai.createKhuyenMaiFailure):
      messageError(action.payload);
      return {
        ...state,
        isLoading: true,
        data: [...state.data],
      };
    case getType(updateKhuyenMai.updateKhuyenMaiSuccess):    
      messageSuccess("Chỉnh sửa thành công");
      return {
        ...state,
        data: state.data.map((KhuyenMai) =>
          KhuyenMai._id === action.payload._id ? action.payload : KhuyenMai
        ),
      };
    case getType(updateKhuyenMai.updateKhuyenMaiFailure):
      messageError(action.payload);
      return {
        ...state,
        isLoading: true,
        data: [...state.data],
      };
    case getType(deleteKhuyenMai.deleteKhuyenMaiSuccess):
      messageSuccess("Xóa thành công");
      return {
        ...state,
        data: state.data.filter(
          (KhuyenMai) => KhuyenMai._id !== action.payload
        ),
      };
    case getType(deleteKhuyenMai.deleteKhuyenMaiFailure):
      console.log('saga', action.payload);
      messageError(action.payload);
      return {
        ...state,
        isLoading: true,
        data: [...state.data],
      };
    default:
      return state;
  }
}
