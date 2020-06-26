const initialState = {

    settings: null,


}

const userSettings = (state = initialState, action) => {
    switch (action.type) {

        case "GET_SETTINGS":
            return {
                ...state,
                settings: action.payload
            }

        default:
            return state
    }
}

export default userSettings;