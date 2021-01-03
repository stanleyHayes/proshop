import PRODUCT_ACTION_TYPES from "./product-action-types";

const INITIAL_STATE = {
    products: [],
    error: null,
    loading: false,
    product: {}
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: null
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                products: [],
                error: action.payload
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                productDetail: {}
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetail: action.payload,
                error: null
            }

        case PRODUCT_ACTION_TYPES.GET_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                productDetail: {},
                error: action.payload
            }

        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products.map(product => {
                    if(product._id === action.payload._id){
                        return action.payload
                    }
                    return product;
                })],
                error: null
            }

        case PRODUCT_ACTION_TYPES.UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }


        case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products.filter(product => product._id !== action.payload._id)],
                error: null
            }

        case PRODUCT_ACTION_TYPES.DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case PRODUCT_ACTION_TYPES.CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case PRODUCT_ACTION_TYPES.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                products: [...state.orders, action.payload],
                productDetail: action.payload
            }

        case PRODUCT_ACTION_TYPES.CREATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default productReducer;