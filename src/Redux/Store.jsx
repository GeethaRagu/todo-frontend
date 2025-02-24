import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './Slice/UserSlice';
import todoReducer from './Slice/ToDoSlice';
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { persistReducer } from "redux-persist";
const rootReducer = combineReducers({
    user:userReducer,
    todo:todoReducer,
})
const persistConfig = {
    key:"root",
    storage,
    version:1
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store =configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

export const persistor = persistStore(store);