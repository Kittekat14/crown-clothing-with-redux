import { takeLatest, all, call, put } from "redux-saga/effects";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from "./categories.action";

import { CATEGORIES_ACTION_TYPES } from "./categories.types";

export function* fetchCategoriesAsync() {
  try {
    // we store the result of the fetch to Firestore "categories"-collection
    const categoriesArray = yield call(getCategoriesAndDocuments); // call is making function a "generator effect"
    yield put(fetchCategoriesSuccess(categoriesArray)); // put is generator version of "dispatch"
  } catch (error) {
    yield put(fetchCategoriesFailure(error));
  }
}

// 1st generator func
export function* onFetchCategories() {
  // takeLatest method receives actions (like case in switch), and what you want to happen
  yield takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
    fetchCategoriesAsync
  );
}

// here all sagas get collected in an aggregator saga:
export function* categoriesSaga() {
  yield all([call(onFetchCategories)]); // "all" must complete until we continue
}
