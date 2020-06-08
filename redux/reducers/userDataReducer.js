const initialState = {

    allUser:null
}

const userData = (state = initialState, action) => {
    switch (action.type) {

        case "GET_ALL_USER_DATA":
            return {
                ...state,
                allUser: action.payload
            }
        default:
            return state
    }
}

export default userData;