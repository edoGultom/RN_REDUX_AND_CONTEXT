import * as Actions from './const';

export const initialState = {
    data: [],
    message: '',
    loading: true
}

export const contactReducer = (state, action) => {
    switch (action.type) {
        case Actions.GET_ALL_CONTACT_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case Actions.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case Actions.GET_ALL_CONTACT_ERROR:
            return {
                ...state,
                loading: false
            };

        case Actions.SET_CONTACT_SUCCESS:
            return {
                ...state,
                message: action.payload
            };
        case Actions.DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                message: action.payload
            };
        case Actions.UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}

