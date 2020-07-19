const initialState = {
    projects: [],
    project: {}
};

export function projects (state = initialState, action) {
    switch (action.type) {
        case 'PRODUCTS_FETCH_SUCCESS':
            return {
                ...state,
                projects: action.projects
            };
        case 'PRODUCTS_VOTED_SUCCESS':
            return {
                ...state,
                project: action.project
            };
        default:
            return state;
    }

}
