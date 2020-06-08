const initialState = {

    post: null,
    postData: null,
    userPostData: null
}

const userPostData = (state = initialState, action) => {
    switch (action.type) {

        case "GET_POST":
            return {
                ...state,
                post: action.payload
            }
        case "GET_POST_DATA":
            return {
                ...state,
                postData: action.payload
            }
        case  "GET_USER_POST_ID":
            return {
                ...state,
                userPostData: action.payload

            }
        default:
            return state
    }
}

export default userPostData;