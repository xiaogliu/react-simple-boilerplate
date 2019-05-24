import { put, takeEvery } from 'redux-saga/effects';
import request from '../../services/api/request';

function* getIP(action) {
  try {
    const urlPar = {
      ip: '17.89.35.58',
    };
    const result = yield request.getIP(urlPar);
    yield put({ type: 'HOME_GET_IP_INFO_SUCCEEDED', response: result.data });
  } catch (e) {
    console.log(e);
  }
}

export const homeSaga = [takeEvery('HOME_GET_IP_INFO_START', getIP)];
