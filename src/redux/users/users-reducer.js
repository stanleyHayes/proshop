import USER_ACTION_TYPES from "./user-action-types";

const INITIAL_STATE = {
    users: [],
    userDetail: {},
    userError: null,
    userLoading: false
};


const usersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case USER_ACTION_TYPES.GET_USERS_REQUEST:
            return {
                ...state,
                userLoading: true
            }

        case USER_ACTION_TYPES.GET_USERS_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: action.payload,
                userError: null
            }

        case USER_ACTION_TYPES.GET_USERS_FAIL:
            return {
                ...state,
                userLoading: false,
                users: [],
                userError: action.payload
            }

        case USER_ACTION_TYPES.GET_USER_REQUEST:
            return {
                ...state,
                userLoading: true
            }

        case USER_ACTION_TYPES.GET_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                userDetail: action.payload,
                userError: null
            }

        case USER_ACTION_TYPES.GET_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                userError: action.payload,
                userDetail: null
            }


        case USER_ACTION_TYPES.UPDATE_USER_REQUEST:
            return {
                ...state,
                userLoading: true
            }

        case USER_ACTION_TYPES.UPDATE_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: [...state.users.map(user => {
                    if(user._id === action.payload._id){
                        return action.payload
                    }
                    return user;
                })],
                userError: null
            }

        case USER_ACTION_TYPES.UPDATE_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                userError: action.payload
            }


        case USER_ACTION_TYPES.DELETE_USER_REQUEST:
            return {
                ...state,
                userLoading: true
            }

        case USER_ACTION_TYPES.DELETE_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: [...state.users.filter(user => user._id !== action.payload._id)],
                userError: null
            }

        case USER_ACTION_TYPES.DELETE_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                userError: action.payload
            }


        case USER_ACTION_TYPES.CREATE_USER_REQUEST:
            return {
                ...state,
                userLoading: true
            }

        case USER_ACTION_TYPES.CREATE_USER_SUCCESS:
            return {
                ...state,
                userLoading: false,
                users: [...state.users, action.payload],
                userError: null
            }

        case USER_ACTION_TYPES.CREATE_USER_FAIL:
            return {
                ...state,
                userLoading: false,
                userError: action.payload
            }
        default:
            return state;
    }
}

export default usersReducer;