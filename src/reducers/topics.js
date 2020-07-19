const initialState = {
    topics: [],
    topic: {}
};

export function topics (state = initialState, action) {
    switch (action.type) {
        case 'TOPICS_FETCH_SUCCESS':
            return {
                ...state,
                topics: action.topics
            };
        case 'TOPIC_ADD_SUCCESS':
            return {
                ...state,
                topic: action.topic
            };
        case 'TOPIC_VOTED_SUCCESS':
            return {
                ...state,
                topic: action.topic
            };
        case 'TOPIC_DELETE_SUCCESS':
            return {
                ...state,
                id: action.id
            };
        default:
            return state;
    }

}
