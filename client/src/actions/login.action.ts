export const ActionTypes = {
    SEND_DATA_REQUEST: 'SEND_DATA_REQUEST',
    SEND_DATA_SUCCESS: 'SEND_DATA_SUCCESS',
    SEND_DATA_FAILURE: 'SEND_DATA_FAILURE',
};
export const sendDataRequest = (details: any) => ({
    type: ActionTypes.SEND_DATA_REQUEST,
    payload: details,
});
export const sendDataSuccess = (user: any) => ({
    type: ActionTypes.SEND_DATA_SUCCESS,
    payload: user,
});
export const sendDataFailure = (err: any) => ({
    type: ActionTypes.SEND_DATA_FAILURE,
    payload: err,
    error: true,
});