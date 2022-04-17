import { combineReducers } from 'redux';
// import listContact from './ListContact';
// import createContact from './CreateContact';
import contactReducer from './contactReducer';

const rootReducer = combineReducers({
    contactReducer: contactReducer,
    // listContact: listContact,
    // createContact: createContact
})
export default rootReducer
