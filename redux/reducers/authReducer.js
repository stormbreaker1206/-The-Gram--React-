const initialState = {
    isLoading: true,
    isSignedIn: false,
    currentUser: null,
    currentUserData: null,

}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case "SIGN_IN":
            return{
                ...state,
                isSignedIn: true,
                currentUser: action.payload,
                isLoading: false
            }
        case "SIGN_OUT":
            return {

                ...state,
                isSignedIn: false,
                currentUser: null,
                isLoading: false,
                currentUserData: null
            }
        case "GET_USER_DATA":
            return {
                ...state,
                currentUserData: action.payload
            }

        default:
            return state
    }
}

export default auth;