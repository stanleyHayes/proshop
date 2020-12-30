import AUTH_ACTION_TYPES from "./authentication-action-types";

const INITIAL_STATE = {
    token: null,
    userProfile: {},
    loading: false,
    error: null
};

const authenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case AUTH_ACTION_TYPES.SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true
            }

        case AUTH_ACTION_TYPES.SIGN_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userProfile: action.payload.user,
                token: action.payload.token
            }

        case AUTH_ACTION_TYPES.SIGN_UP_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userProfile: {}
            }

        case AUTH_ACTION_TYPES.SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case AUTH_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userProfile: action.payload.user,
                token: action.payload.token
            }

        case AUTH_ACTION_TYPES.SIGN_IN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userProfile: {}
            }

        case AUTH_ACTION_TYPES.GET_LOGGED_IN_REQUEST:
            return {
                ...state,
                loading: true
            }

        case AUTH_ACTION_TYPES.GET_LOGGED_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userProfile: action.payload.user,
                token: action.payload.token
            }

        case AUTH_ACTION_TYPES.GET_LOGGED_IN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userProfile: {}
            }
        default:
            return state;
    }
}


export default authenticationReducer;