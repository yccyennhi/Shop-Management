import { INIT_STATE } from "../../constant";
import { getTongQuans, getType } from "../actions";

export default function KhuyenMaisReducer(
  state = INIT_STATE.TongQuans,
  action
) {
  switch (action.type) {
    case getType(getTongQuans.getDataRequest):
      return {
        ...state,
        isLoading: true,
      };

    case getType(getTongQuans.getDataSuccess):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getTongQuans.getDataFailure):
      return {
        ...state,
        isLoading: false,
      };

    case getType(getTongQuans.getStatistics):
      return {
        ...state,
        statistics: action.payload,
      };

    case getType(getTongQuans.getRankingByDoanhThu):
      return {
        ...state,
        rankingByDoanhThu: action.payload,
      };

    case getType(getTongQuans.getHighestSanPhamList):
      return {
        ...state,
        highestSanPhamList: action.payload,
      };

    default:
      return state;
  }
}
