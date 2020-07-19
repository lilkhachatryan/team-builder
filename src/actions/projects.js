import * as endpoints from "../utils/endpoints";
import { notifySuccess } from "../plugins/notify";

export function projectsFetchSuccess (data) {
    return {
        type: 'PROJECTS_FETCH_SUCCESS',
        data
    }

}

export function projectsVoteSuccess (data) {
    return {
        type: 'PROJECT_VOTED_SUCCESS',
        data
    }

}

export function getProjects() {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        return endpoints.getProjects()
            .then((response) => {
                if (response.status === 200) {
                    dispatch(projectsFetchSuccess(response.data))
                }
            })
        // .catch(() => dispatch(itemsHaveError(true)));
    };
}

export function voteProject (id, payload) {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        endpoints.voteProject(id, payload)
            .then((response) => {
                if (response.status === 200) {
                    console.log('add topic', response.data);
                    dispatch(projectsVoteSuccess(response.data));
                    notifySuccess('Topic added successfully');
                }
                // dispatch(itemsAreLoading(false));
            })
        // .catch(() => dispatch(itemsHaveError(true)));
    };
}
