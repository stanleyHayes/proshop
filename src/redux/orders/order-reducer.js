import ORDER_ACTION_TYPES from "./order-action-types";

const INITIAL_STATE = {
    orders: [],
    orderError: null,
    orderDetail: {},
    ordersLoading: false
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case ORDER_ACTION_TYPES.CREATE_ORDER_REQUEST:
            return {
                ...state,
                ordersLoading: true,
                orderError: null
            }

        case ORDER_ACTION_TYPES.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                orderError: null,
                orders: [...state.orders, action.payload],
                orderDetail: action.payload
            }

        case ORDER_ACTION_TYPES.CREATE_ORDER_FAIL:
            return {
                ...state,
                ordersLoading: false,
                orderError: action.payload
            }

        case ORDER_ACTION_TYPES.GET_ORDER_REQUEST:
            return {
                ...state,
                ordersLoading: true,
            }

        case ORDER_ACTION_TYPES.GET_ORDER_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                orderError: null,
                orderDetail: action.payload
            }

        case ORDER_ACTION_TYPES.GET_ORDER_FAIL:
            return {
                ...state,
                ordersLoading: false,
                orderError: action.payload,
                orderDetail: null
            }

        case ORDER_ACTION_TYPES.GET_ORDERS_BY_LOGGED_IN_USER_REQUEST:
            return {
                ...state,
                ordersLoading: true,
            }

        case ORDER_ACTION_TYPES.GET_ORDERS_BY_LOGGED_IN_USER_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                orderError: null,
                orders: action.payload
            }

        case ORDER_ACTION_TYPES.GET_ORDERS_BY_LOGGED_IN_USER_FAIL:
            return {
                ...state,
                ordersLoading: false,
                orderError: action.payload,
                orders: []
            }

        case ORDER_ACTION_TYPES.GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ORDER_ACTION_TYPES.GET_ORDERS_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                error: null,
                orders: action.payload
            }

        case ORDER_ACTION_TYPES.GET_ORDERS_FAIL:
            return {
                ...state,
                ordersLoading: false,
                orderError: action.payload,
                orders: []
            }


        case ORDER_ACTION_TYPES.UPDATE_ORDER_REQUEST:
            return {
                ...state,
                ordersLoading: true
            }

        case ORDER_ACTION_TYPES.UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                orders: [...state.orders.map(order => {
                    if (order._id === action.payload._id) {
                        return action.payload
                    }
                    return order;
                })],
                orderError: null
            }

        case ORDER_ACTION_TYPES.UPDATE_ORDER_FAIL:
            return {
                ...state,
                ordersLoading: false,
                orderError: action.payload
            }


        case ORDER_ACTION_TYPES.DELETE_ORDER_REQUEST:
            return {
                ...state,
                ordersLoading: true
            }

        case ORDER_ACTION_TYPES.DELETE_ORDER_SUCCESS:
            return {
                ...state,
                ordersLoading: false,
                orders: [...state.orders.filter(order => order._id !== action.payload._id)],
                orderError: null
            }

        case ORDER_ACTION_TYPES.DELETE_ORDER_FAIL:
            return {
                ...state,
                ordersLoading: false,
                orderError: action.payload
            }

        case ORDER_ACTION_TYPES.RESET_ORDER:
            return {
                ...state,
                orders: [],
                orderDetail: null
            }
        default:
            return state;
    }
}

export default orderReducer;