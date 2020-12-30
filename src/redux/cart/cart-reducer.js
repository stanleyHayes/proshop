import CART_ACTION_TYPES from "./cart-action-types";

const INITIAL_STATE = {
    items: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CART_ACTION_TYPES.CART_ADD_ITEM:
            const existItem = state.items.find(item => item.product === action.payload.product);
            if (!existItem) {
                return {
                    ...state,
                    items: [...state.items, action.payload]
                }
            } else {
                return {
                    ...state,
                    items: state.items.map(item => {
                        if (item.product === action.payload.product) {
                            return action.payload;
                        }
                        return item;
                    })
                };
            }
        case CART_ACTION_TYPES.CART_REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.product !== action.payload)
            };
        default:
            return state;
    }
}

export default cartReducer;