import {
    FETCH_CONTACTS_BEGIN,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE
} from '../actions/contacts';

const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function contactsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_CONTACTS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.contacts
            };

        case FETCH_CONTACTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            };

        default:
            return state;
    }
}
