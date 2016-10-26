/* @flow */
"use strict";

import { browserHistory } from "react-router";
import { API_URL } from "../config";
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from "./types";
import { get } from "../utils/auth";

const createPostRequest = (endpoint, objectPayload) =>
    new Request(`${API_URL}${endpoint}`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body   : JSON.stringify(objectPayload)
    });

export const showAuthError = error => ({
    type   : AUTH_ERROR,
    payload: error
});

// this action creator make use of redux-thunk middleware
// redux thunk allow us to dispatch multiple action instead of just one
const authenticate = endpoint =>
    (email, password) =>
        dispatch =>
            fetch(
                createPostRequest(endpoint, {
                    email,
                    password
                })
            ).then(
                response => response.json()
            ).then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    dispatch({type: AUTH_USER});
                    // redirect to /resource
                    browserHistory.push("/resources");
                } else {
                    dispatch(showAuthError(data.error));
                }
            }).catch(reason => {
                console.error(reason);
                dispatch(showAuthError("Username or password is"
                                       + " incorrect!"));
            });

export const signInUser = authenticate("/signin");
export const signUpUser = authenticate("/signup");
export const signOutUser = () => {
    localStorage.removeItem("token");
    return {type: UNAUTH_USER};
};

// TODO: Remove this ASAP
// BAD EXAMPLE!
export const testAuth = fn => get(
    "/",
    (dispatch, data) => {
        fn(data);
    },
    (dispatch, reason) => {
        fn(reason);
    }
);

export default {
    signInUser,
    signUpUser,
    signOutUser,
    showAuthError,
    testAuth
};
