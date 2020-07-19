import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../reducers"

export default function configureStore (initialState = {}) {
    const enhancer = applyMiddleware(thunk);

    return createStore(
        reducers,
        initialState,
        enhancer
    )
}
