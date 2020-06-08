const initialState = {

    hotTopicsPostID: null,
    hotTopicsPostData:null

}

const hotTopics = (state = initialState, action) => {
    switch (action.type) {

        case "GET_HOT_TOPICS_POST_ID":
            return {
                ...state,
                hotTopicsPostID: action.payload
            }
        case "GET_HOT_TOPICS_DATA":
            return {
                ...state,
                hotTopicsPostData: action.payload
            }

        default:
            return state
    }
}

export default hotTopics;