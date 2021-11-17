import { INIT_STATE } from "../../constant";
import {
  getPhieuHens,
  getType,
  createPhieuHen,
  updatePhieuHen,
  deletePhieuHen,
} from "../actions";

export default function PhieuHensReducer(state = INIT_STATE.PhieuHens, action) {
  switch (action.type) {
    case getType(getPhieuHens.getPhieuHensRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPhieuHens.getPhieuHensSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPhieuHens.getPhieuHensFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(createPhieuHen.createPhieuHenSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updatePhieuHen.updatePhieuHenSuccess):
      return {
        ...state,
        data: state.data.map((PhieuHen) =>
          PhieuHen._id === action.payload._id ? action.payload : PhieuHen
        ),
      };
    case getType(deletePhieuHen.deletePhieuHenSuccess):
      return {
        ...state,
        data: state.data.filter(
          (PhieuHen) => PhieuHen._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
