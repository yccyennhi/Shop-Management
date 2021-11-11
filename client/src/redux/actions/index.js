import {createActions} from 'redux-actions';

export const getType = (reduxAction) => {
    return reduxAction().type;
}

export const getSanPhams = createActions({
    getSanPhamsRequest: undefined,
    getSanPhamsSuccess: (payload) => payload,
    getSanPhamsFailure: (err) => err,
});