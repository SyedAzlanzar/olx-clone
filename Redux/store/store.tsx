import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //
import { applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

const reducers = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

// export const store = createStore(persistReducer, composeWithDevTools(applyMiddleware(thunk)));
export const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
  middleware : [thunk]

});
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
