import PRODUCT_ACTION_TYPES from "./product-action-types";

const INITIAL_STATE = {
    products: [],
    error: null,
    loading: false,
    productDetail: {}
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
                    if (product._id === action.payload._id) {
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

        case PRODUCT_ACTION_TYPES.CREATE_REVIEW_REQUEST:
            return {
                error: null,
                loading: true
            }

        case PRODUCT_ACTION_TYPES.CREATE_REVIEW_SUCCESS:
            console.log(action.payload, 'review');
            return {
                ...state,
                products: [...state.products.map(product => {
                    if (product._id === action.payload.product) {
                        product.reviews.push(action.payload);
                        return product;
                    }
                    return product;
                })]
            }

        case PRODUCT_ACTION_TYPES.CREATE_REVIEW_FAIL:
            return {
                error: action.payload,
                loading: false
            }


        case PRODUCT_ACTION_TYPES.UPDATE_REVIEW_REQUEST:
            return {
                error: null,
                loading: true
            }

        case PRODUCT_ACTION_TYPES.UPDATE_REVIEW_SUCCESS:
            return {
                ...state,
                products: [...state.products.map(product => {
                    if (product._id === action.payload.product) {
                        product.reviews = product.reviews.filter(review => {
                            if (review._id === action.payload._id) {
                                return action.payload;
                            }
                            return review;
                        });
                        return product;
                    }
                    return product;
                })]
            }

        case PRODUCT_ACTION_TYPES.UPDATE_REVIEW_FAIL:
            return {
                error: action.payload,
                loading: false
            }

        case PRODUCT_ACTION_TYPES.DELETE_REVIEW_REQUEST:
            return {
                error: null,
                loading: true
            }

        case PRODUCT_ACTION_TYPES.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                products: [...state.products.map(product => {
                    if (product._id === action.payload.product) {
                        product.reviews = product.reviews.filter(review => review._id !== action.payload._id);
                        return product;
                    }
                    return product;
                })]
            }

        case PRODUCT_ACTION_TYPES.DELETE_REVIEW_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}

export default productReducer;