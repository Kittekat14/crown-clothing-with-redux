import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/categories.saga";
import { userSagas } from "./user/user.saga";

// ES6 generator function:
/**
 * Redux sagas are generator functions. For example async-await functions are built similar to generator functions.
 * Special syntax:
 * - function keyword with a * used and named individually
 * - no parameters used
 * - doesn't return anything, but when invoked, we are getting the Generator Object (this means we instantiated it),
 * and invoking it again with .next(), runs the function's content and gives back a object { value: undefined, done: true} 
 * => "done: true" = execution finished, then value is always undefined, except you cast the last value as a return
 * another example:
 * 
 * function* foo(index) {
  while (index < 2) {
    yield index;
    index++;
  }
}

const iterator = foo(0);

console.log(iterator.next().value);
// Expected output: 0

console.log(iterator.next().value);
// Expected output: 1
 */

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}
