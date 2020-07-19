export function users(state = {}, action) {
    switch (action.type) {
        case 'USER_FETCH_SUCCESS':
            return action.user;
        default:
            return state;
    }

}
