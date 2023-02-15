import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// middlewares ~ library helpers run before the action hits the reducer
const middleWares = [logger];

// enhancer, because we enhance our store + compose: composes functions left to right when having more than 1 middleware
const composedEnhancers = compose(applyMiddleware(...middleWares));

// root-reducer
export const store = createStore(rootReducer, undefined, composedEnhancers);
