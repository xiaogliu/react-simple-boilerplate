import { all } from 'redux-saga/effects';
import { homeRootSaga } from '../../pages/Home/redux/saga';

const sagas = [...homeRootSaga];

export default function* rootSaga() {
  yield all([...sagas]);
}
