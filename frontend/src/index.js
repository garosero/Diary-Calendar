import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, useHistory} from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas/index';
import { tempSetUser, LOAD_MY_INFO_REQUEST } from './reducers/user';
import { loadUserAPI } from './lib/api/auth';

const sagaMiddleware = createSagaMiddleware(); //사가 미들웨어 만들기 
const middlewares = [sagaMiddleware];
//compose - middleware 여러개 합성
// const enhancer = compose(
//   applyMiddleware(...middlewares),
//   window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) =>f,
// );

/** 배포할 땐 사가에 로그가 보여지는 것 보안에 위협. 
 * const enhancer = process.env.NODE_ENV === 'production' 
 * ? compose(
 *  applyMiddlewares(...middlewares),)
 * :
 *  compose (
 *    applyMiddleware(...middlewares),
 *    !options.isServer && window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : 
 */
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

function loadUser(){
  try{
    //store.dispatch(tempSetUser(user));
    store.dispatch({
      type : LOAD_MY_INFO_REQUEST,
    });
  }catch(e){
    console.log(e);
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root"),
  
);
