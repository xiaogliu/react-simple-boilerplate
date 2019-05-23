import { put, takeEvery } from 'redux-saga/effects';

function fetchUser(action) {
  console.log(111);
}

export const homeSaga = [takeEvery('home_send_first_data', fetchUser)];
