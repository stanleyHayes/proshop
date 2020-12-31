import AUTH_ACTION_TYPES from "./authentication-action-types";

const INITIAL_STATE = {
    token: null,
    userProfile: null,
    loading: false,
    error: null
};

const authenticationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case AUTH_ACTION_TYPES.SIGN_UP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
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
                userProfile: null
            }

        case AUTH_ACTION_TYPES.SIGN_IN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
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
                userProfile: null
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
                userProfile: null
            }

        case AUTH_ACTION_TYPES.UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case AUTH_ACTION_TYPES.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userProfile: action.payload.user,
                token: action.payload.token
            }

        case AUTH_ACTION_TYPES.UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case AUTH_ACTION_TYPES.SIGN_OUT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case AUTH_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userProfile: null,
                token: null
            }

        case AUTH_ACTION_TYPES.SIGN_OUT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export default authenticationReducer;