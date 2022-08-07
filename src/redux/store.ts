import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware, { Task } from "redux-saga";
import rootReducer from "./reducers/rootReducer";
import { RootState } from "./state";
export interface SagaStore extends Store {
  sagaTask?: Task;
}

const bindMiddleware = (middleware: any) => {
  if (process.env.NODE_ENV !== "production") {
    // I require this only in dev environment
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export let store: any = undefined;

const makeStore = () => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  // 2: Add an extra parameter for applying middleware:
  store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
  return store;
}

export const wrapper = createWrapper<Store<RootState>>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
