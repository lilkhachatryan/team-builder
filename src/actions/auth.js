import * as endpoints from "../utils/endpoints";
import { notifySuccess } from "../plugins/notify";

export function userFetchSuccess (user) {
    return {
        type: 'USER_FETCH_SUCCESS',
        user
    }

}

export function logout() {
    return (dispatch) => {
        return endpoints.logout()
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                notifySuccess('Logout success');
                console.log('response users', response);
                return response;
            })
        .catch((err) => console.log(err));
    };
}
