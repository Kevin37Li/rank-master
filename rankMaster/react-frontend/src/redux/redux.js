import { createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";

const TYPES = {
    STORE_USERNAME: "STORE_USERNAME",
    CHECK_LOGIN: "CHECK_LOGIN",
}

const initialState = {
    checkLogin: false,
    username: "",
}

export function storeUsername(username) {
    console.log("Store user email action");
    return {
        type: TYPES.STORE_USERNAME,
        payload: {
            username: username,
        },
    };
}

export function storeCheckLogin(checkLogin) {
    console.log("Store user login action");
    return {
        type: TYPES.CHECK_LOGIN,
        payload: {
            checkLogin: checkLogin,
        },
    };
}

function userReducer(state = initialState, action) {
    console.log("Reducer hit");
    switch (action.type) {
        case TYPES.STORE_USERNAME:
            console.log("case store email");
            return {
                ...state,
                username: action.payload.username,
            };
        case TYPES.CHECK_LOGIN:
            return {
                ...state,
                checkLogin: action.payload.checkLogin,
            };
        default:
            return {
                ...state,
            };
    }
}

let store = createStore(userReducer, composeWithDevTools());
export default store;