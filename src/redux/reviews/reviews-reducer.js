import REVIEW_ACTION_TYPES from "./reviews-action-types";
const INITIAL_STATE = {
    reviews: [],
    errorReview: null,
    loadingReview: false,
    reviewDetail: {}
}

const reviewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REVIEW_ACTION_TYPES.GET_REVIEWS_BY_PRODUCT_REQUEST:
            return {
                ...state,
                loadingReview: true
            }
        case REVIEW_ACTION_TYPES.GET_REVIEWS_BY_PRODUCT_SUCCESS:
            return {
                ...state,
                loadingReview: false,
                reviews: action.payload,
                errorReview: null
            }
        case REVIEW_ACTION_TYPES.GET_REVIEWS_BY_PRODUCT_FAIL:
            return {
                ...state,
                loadingReview: false,
                reviews: [],
                errorReview: action.payload
            }


        case REVIEW_ACTION_TYPES.CREATE_REVIEW_REQUEST:
            return {
                errorReview: null,
                loadingReview: true
            }
        case REVIEW_ACTION_TYPES.CREATE_REVIEW_SUCCESS:
            return {
                ...state,
               reviews: [...state.reviews, action.payload],
                loadingReview: false,
                errorReview: null
            }
        case REVIEW_ACTION_TYPES.CREATE_REVIEW_FAIL:
            return {
                errorReview: action.payload,
                loadingReview: false
            }

        case REVIEW_ACTION_TYPES.UPDATE_REVIEW_REQUEST:
            return {
                errorReview: null,
                loadingReview: true
            }
        case REVIEW_ACTION_TYPES.UPDATE_REVIEW_SUCCESS:

            return {
                ...state,
                reviews: [...state.reviews.map(review => {
                    if (review._id === action.payload._id){
                        return action.payload;
                    }
                    return review;
                })],
                reviewDetail: action.payload,
                loadingReview: false,
                errorReview: null
            }
        case REVIEW_ACTION_TYPES.UPDATE_REVIEW_FAIL:
            return {
                errorReview: action.payload,
                loadingReview: false
            }


        case REVIEW_ACTION_TYPES.DELETE_REVIEW_REQUEST:
            return {
                loadingReview: true,
                errorReview: null
            }
        case REVIEW_ACTION_TYPES.DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                errorReview: false,
                loadingReview: false,
                reviews: [...state.reviews.filter(review => review._id !== action.payload._id)]
            }
        case REVIEW_ACTION_TYPES.DELETE_REVIEW_FAIL:
            return {
                errorReview: action.payload,
                loadingReview: false
            }
        default:
            return state;
    }
}

export default reviewReducer;