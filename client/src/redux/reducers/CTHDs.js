import { INIT_STATE } from "../../constant";
import { getCTHDs, getType } from "../actions";

export default function CTHDsReducer(state = INIT_STATE.CTHDs, action) {
    switch (action.type) {
        case getType(getCTHDs.getCTHDsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getCTHDs.getCTHDsSuccess):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getCTHDs.getCTHDsFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
