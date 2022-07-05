import axios from 'axios';
import { api } from '../../api';
import { DELETE_CONTACT_SUCCESS, GET_ALL_CONTACT_ERROR, GET_ALL_CONTACT_SUCCESS, SET_CONTACT_SUCCESS, SET_CREATE_LOADING, SET_LOADING, UPDATE_CONTACT_SUCCESS } from './const';

export const getAllContact = (callBack) => {
    axios.get(`${api}/contact`)
        .then(response => {
            // if (response.data) {
            //     dispatch({
            //         type: GET_ALL_CONTACT_SUCCESS,
            //         payload: response.data.data,
            //     });
            //     dispatch({
            //         type: SET_LOADING,
            //         payload: false
            //     });

            // } else {
            //     dispatch({ type: GET_ALL_CONTACT_ERROR });
            // }
            callBack({ type: GET_ALL_CONTACT_SUCCESS, payload: response.data.data });
            callBack({ type: SET_LOADING, payload: false });
        })
        .catch(function (error) {
            console.log(error.response)
            callBack({ type: GET_ALL_CONTACT_ERROR, payload: [] });

        });
}

export function createDataContact(data, callBack) {
    return async (dispatch) => {
        await axios
            .post(`${api}/contact`, data)
            .then(async response => {
                if (response.data.message !== "") {
                    dispatch({ type: SET_LOADING, payload: true });
                    await dispatch({
                        type: SET_CONTACT_SUCCESS,
                        payload: response.data.message,
                    });
                    dispatch({ type: SET_LOADING, payload: false });
                    callBack({ status: true, pesan: response.data.message });
                } else {
                    dispatch({ type: SET_LOADING, payload: false });
                    callBack({ status: false, pesan: response.data.message });
                }
            })
            .catch(function (error) {
                var responseError = error.response;
                var split = responseError.data.message.split('because ');
                dispatch({ type: SET_LOADING, payload: false });
                callBack({ status: false, pesan: split[1] });
            });
    };
}
export function deleteContact(id, callBack) {
    return async (dispatch) => {
        await axios.delete(`${api}/contact/` + id)
            .then(async response => {
                console.log(response)
                if (response.data.message !== "") {
                    dispatch({ type: SET_LOADING, payload: true });
                    await dispatch({
                        type: DELETE_CONTACT_SUCCESS,
                        payload: response.data.message,
                    });
                    dispatch({ type: SET_LOADING, payload: false });
                    callBack({ status: true, pesan: response.data.message });
                } else {
                    dispatch({ type: SET_LOADING, payload: false });
                    callBack({ status: false, pesan: response.data.message });
                }
            })
            .catch(function (error) {
                var responseError = error.response;
                dispatch({ type: SET_LOADING, payload: false });
                callBack({ status: false, pesan: responseError.data.message });
            });
    };
}
export function updateDataContact(id, data, callBack) {

    return async (dispatch) => {
        await axios
            .put(`${api}/contact/` + id, data)
            .then(async response => {

                if (response.data.message !== "") {
                    dispatch({ type: SET_LOADING, payload: true });
                    await dispatch({
                        type: UPDATE_CONTACT_SUCCESS,
                        payload: response.data.data,
                    });
                    dispatch({ type: SET_LOADING, payload: false });
                    callBack({ status: true, pesan: response.data.message });
                } else {
                    dispatch({ type: SET_LOADING, payload: false });
                    callBack({ status: false, pesan: response.data.message });
                }
            })
            .catch(function (error) {
                var responseError = error.response;
                var split = responseError.data.message.split('because ');
                dispatch({ type: SET_LOADING, payload: false });
                callBack({ status: false, pesan: split[1] });
            });
    };
}
