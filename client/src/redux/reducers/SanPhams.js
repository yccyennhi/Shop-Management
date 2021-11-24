import { INIT_STATE } from "../../constant";
import {
  getSanPhams,
  getType,
  createSanPham,
  updateSanPham,
  deleteSanPham,
} from "../actions";
import { messageSuccess, messageError } from "../../components/message";

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
        data: action.payload,
      };
    case getType(getSanPhams.getSanPhamsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createSanPham.createSanPhamSuccess):
      messageSuccess("Thêm mới thành công");
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updateSanPham.updateSanPhamSuccess):
      messageSuccess("Chỉnh sửa thành công");
      return {
        ...state,
        data: state.data.map((SanPham) =>
          SanPham._id === action.payload._id ? action.payload : SanPham
        ),
      };
    case getType(deleteSanPham.deleteSanPhamSuccess):
      messageSuccess("Xóa thành công");
      return {
        ...state,
        data: state.data.filter((SanPham) => SanPham._id !== action.payload),
      };
    default:
      return state;
  }
}
