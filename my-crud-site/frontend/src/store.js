import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userListReducer,
  userUpdateReducer,
  getUserDetailsReducer,
  userDeleteReducer,
} from "./Reducer/userReducer";

const reducer = combineReducers({
  userDetails: getUserDetailsReducer,
  userList: userListReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
