import { all, put, select, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { AuthService } from "./../shared/services/auth.service";
import { history } from './../history';

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
            // if (err.response) {
                // if (err.response.status === 404 || err.response.status === 403) {
                //     notify(err.response.data.error);
                // };
            // };
            return
        }
        
        yield put({
            type: '@@AUTH/LOGIN_RECIVED',
            token: response
        })

        yield put({
            type: '@@AUTH/LOGIN_SUCCESS',
        })
        // history.push('/all-books')
       // yield put(push("/all-books"))
    });
}