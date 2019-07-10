// Vendors
import { put, call, takeEvery } from 'redux-saga/effects';

// Services
import { AuthService } from "./../shared/services/auth.service";

const authService = new AuthService();

export function* LoginSaga(): IterableIterator<{}> {
    yield takeEvery(`@@AUTH/LOGIN`, function*(action: any) {
        let response
        try {
            response = yield call(authService.login, action.userData)
        }
        catch (err) {
            yield put({
                type: '@@AUTH/LOGIN_ERROR',
                error: err.response
            })
            return
        }
        
        yield put({
            type: '@@AUTH/LOGIN_RECIVED',
            token: response
        })

        yield put({
            type: '@@AUTH/LOGIN_SUCCESS',
        })
    });
}