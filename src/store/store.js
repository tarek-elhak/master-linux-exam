import {
  applyMiddleware,
  legacy_createStore as createStore,
  compose,
  combineReducers,
} from "redux";
import { authReducer } from "./reducers/auth";
import { questionsReducer } from "./reducers/questions";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  questions: questionsReducer,
});

export const configureStore = () => {
  const middlewares = [thunk];
  const middlewareEnhancers = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancers];
  const reduxCompose =
    (process.env.NODE_ENV === "development"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null) || compose;
  const composeEnhancers = reduxCompose(...enhancers);
  const store = createStore(rootReducer, composeEnhancers);

  return store;
};
