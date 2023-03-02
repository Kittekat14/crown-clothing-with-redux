import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // will use localStorage by default in every browser

// import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

const ourOwnLoggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("action type:", action.type);
  console.log("action payload:", action.payload);
  console.log("currentState:", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// middlewares ~ library helpers run before the action hits the reducer
const middleWares = [ourOwnLoggerMiddleware];

// enhancer, because we enhance our store + compose: composes functions left to right when having more than 1 middleware
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer
export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

export const persistor = persistStore(store);
