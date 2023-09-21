import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import contactsReducer from './reducers/contacts';
const rootReducer = combineReducers({
    contactsReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);

export default store;
