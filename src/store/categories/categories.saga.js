import { takeLatest, all, call, put } from "redux-saga/effects"; // are side effect generators of redux
// call: call is making a function a "generator effect" (inside a generator function); 1st parameter is function itself, 2nd parameter is argument of that function call
// all: runs everything inside and stops only when it's done (like yield, but for > 1 generator function)
// takeLatest: responds to the latest action (replacement of reducer's switch-case-statements)
// put: after something is awaited and received when yielded, it needs to be "put" = equivalent to reducer's "dispatch"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    // we store the result of the fetch to Firestore "categories"-collection; with "yield", we have to wait until something comes back
    const categoriesArray = yield call(getCategoriesAndDocuments, "categories"); // call is making function a "generator effect",
    // call: 1st para is function itself, 2nd para is parameter of that function
    yield put(fetchCategoriesSuccess(categoriesArray)); // put is generator version of "dispatch"
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

// 1st generator func
export function* onFetchCategories() {
  // takeLatest method receives latest of the actions mentioned (like case in switch), and what you want to happen and calls async function above
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// here all sagas get collected in an aggregator saga:
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // "all" must complete until we continue
}
