const initialState = {
    isLoading: true,
    isSignedIn: false,
    currentUser: null,
    currentUserData: null,
    currentUserNotification: null,
    notificationCount:null

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
                currentUserData: null,
                
            }
        case "GET_USER_DATA":
            return {
                ...state,
                currentUserData: action.payload
            }
            case "GET_NOTIFICATION_COUNT":
            return {
                ...state,
                notificationCount: action.payload
            }
            case "GET_USER_NOTIFICATION":
                return {
                    ...state,
                    currentUserNotification: action.payload
                }

        default:
            return state
    }
}

export default auth;