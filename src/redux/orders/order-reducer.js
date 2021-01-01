import ORDER_ACTION_TYPES from "./order-action-types";

const INITIAL_STATE = {
    orders: [],
    error: null,
    orderDetail: null,
    loading: false
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type){

        case ORDER_ACTION_TYPES.CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case ORDER_ACTION_TYPES.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: [...state.orders, action.payload],
                orderDetail: action.payload
            }

        case ORDER_ACTION_TYPES.CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export default orderReducer;