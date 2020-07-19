import * as endpoints from "../utils/endpoints";
import { notifySuccess } from "../plugins/notify";

export function userFetchSuccess (user) {
    return {
        type: 'USER_FETCH_SUCCESS',
        user
    }

}

export function getUser() {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        return endpoints.getUser()
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                // dispatch(itemsAreLoading(false));
                console.log('response users', response);
                return response;
            })
            .then((response) => dispatch(userFetchSuccess(response.data)))
            // .catch(() => dispatch(itemsHaveError(true)));
    };
}

export function updateUser(payload) {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        endpoints.updateUser(payload)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                // dispatch(itemsAreLoading(false));
                notifySuccess('User updated successfully');
                return response;
            })
            .then((response) => dispatch(userFetchSuccess(response.data)))
        // .catch(() => dispatch(itemsHaveError(true)));
    };
}
