import axios from 'axios';

export const FETCH_CONTACTS_BEGIN = 'FETCH_CONTACTS_BEGIN';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';

export const fetchContactsBegin = () => ({
    type: FETCH_CONTACTS_BEGIN
});

export const fetchContactsSuccess = contacts => ({
    type: FETCH_CONTACTS_SUCCESS,
    payload: { contacts }
});

export const fetchContactsFailure = error => ({
    type: FETCH_CONTACTS_FAILURE,
    payload: { error }
});

export function fetchContacts(countryId) {
    
    return dispatch => {
     
        // dispatch(fetchContactsBegin());

        const params = {
            companyId: 171,
            page: 1
        };
        
        if(countryId) {
            params.countryId = countryId;
        }

        return axios.get('https://api.dev.pastorsline.com/api/contacts.json', {
            headers: {
                Authorization: 'Bearer [eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU2MCwiZXhwIjoxNzI2NTY3MTc5LCJ0eXBlIjoiYWNjZXNzIiwidGltZXN0YW1wIjoxNjk1MDMxMTc5fQ.0y7NtuVDCvcPvmWbliMs1q02sov2oFC6u2Hi6H4A2W4'
            },
            params
        })
        .then(response => {
            console.log({response});
            dispatch(fetchContactsSuccess(response.data.contacts));
        })
        .catch(error => {
            console.log({error});
            dispatch(fetchContactsFailure(error));
        });
    };
}
