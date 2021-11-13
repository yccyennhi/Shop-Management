import { INIT_STATE } from "../../constant";
import { getHoaDons, getType } from "../actions";

export default function HoaDonsReducer(state = INIT_STATE.HoaDons, action) {
    switch (action.type) {
        case getType(getHoaDons.getHoaDonsRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getType(getHoaDons.getHoaDonsSuccess):
            return {
                ...state,
                isLoading: false,
            };
        case getType(getHoaDons.getHoaDonsFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
