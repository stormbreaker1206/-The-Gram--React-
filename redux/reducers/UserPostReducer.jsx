const initialState = {

    currentPostData: null
}

const userPostData = (state = initialState, action) => {
    switch (action.type) {

        case "GET_USER_POST":
            return {
                ...state,
                currentUserData: action.payload
            }
        default:
            return state
    }
}

export default userPostData;