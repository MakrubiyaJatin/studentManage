import { put, takeLatest, all, call } from "redux-saga/effects";
import api from "../fetch";

const ENDPOINT = "http://localhost:8000"
function* fetchStudent() {
  try {
    const data = yield fetch(`${ENDPOINT}/api/student/get-student`);
    yield put({ type: "GET_STUDENT_SUCCESS", data: data });
  } catch (error) {
    yield put({ type: "REGISTER_USER_ERROR", error });
  }
}

function* login(payload)
{
  try {
    const data = yield call(api,`${ENDPOINT}/api/auth/login`,{
      method:"POST",
      body:JSON.stringify(payload.data)
    })
    yield put({ type: "REGISTER_USER_SUCCESS", data });
  } catch (err) {
    
  }
}

export function* registerSaga(payload) {
  try {
    console.log('payload ', payload)
    const data = yield call(api,`${ENDPOINT}/api/auth/register`,{
      method:"POST",
      body:JSON.stringify(payload.user)
    })
    console.log('data ', data)
    if(data.statusCode !== 201 && data.statusCode !== 200)
    {
     return yield put({ type: "REGISTER_USER_ERROR", error:data.message });
    }
    yield put({ type: "REGISTER_USER_SUCCESS", data });

  } catch (error) {
    yield put({ type: "REGISTER_USER_ERROR", error });
  }
}
function* actionWatcher() {
  yield takeLatest("GET_STUDENT", fetchStudent);
  yield takeLatest("LOGIN", login)
  yield takeLatest("REGISTER_USER", registerSaga);
}

export default function* rootSaga() {
  yield all([actionWatcher()]);
}
