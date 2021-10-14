import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { rootSaga } from "./modules/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import AuthProvider from "./context/providers/AuthProvider";
import { createBrowserHistory } from "history";
import PostsProvider from "./context/providers/PostsProvider";
import ProfileProvider from "./context/providers/ProfileProvider";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);
// history 객체 초기화 -> BrowserRouter에 적용
// useHistory()와 비슷하지만 차이점은 useHistory()는 콤포넌트 레벨에서만 사용
// index.js는 탑레벨이기 때문에, useHistory()를 쓰면 error
export const history = createBrowserHistory();
// Provider -> redux에 활용(지금 x)
// AuthProvider 활용할 예정(context API)
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={history}>
      <ProfileProvider>
        <PostsProvider>
          <AuthProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </AuthProvider>
        </PostsProvider>
      </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
