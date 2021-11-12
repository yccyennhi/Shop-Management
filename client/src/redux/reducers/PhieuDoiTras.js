import { INIT_STATE } from "../../constant";
import { getPhieuDoiTras, getType } from "../actions";

export default function CTHDsReducer(state = INIT_STATE.PhieuDoiTras, action) {
    switch (action.type) {
        case getType(getPhieuDoiTras.getPhieuDoiTrasRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getPhieuDoiTras.getPhieuDoiTraSuccess):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getPhieuDoiTras.getPhieuDoiTrasFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
