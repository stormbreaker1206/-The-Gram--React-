const initialState = {

    currentUserData: null
}

const userData = (state = initialState, action) => {
    switch (action.type) {

        case "GET_USER_DATA":
            return {
                ...state,
                currentUserData: action.payload
            }
        default:
            return state
    }
}

export default userData;