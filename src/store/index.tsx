import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import combiInfoReducer from "./combiInfo";

enableMapSet();

const store: EnhancedStore = configureStore({
    reducer: {
        combiInfo: combiInfoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
