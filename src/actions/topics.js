import * as endpoints from "../utils/endpoints";
import { notifySuccess } from "../plugins/notify";

export function topicsFetchSuccess (topics) {
    return {
        type: 'TOPICS_FETCH_SUCCESS',
        topics
    }

}

export function topicAddSuccess (topic) {
    return {
        type: 'TOPIC_ADD_SUCCESS',
        topic
    }

}

export function topicVoteSuccess (topic) {
    return {
        type: 'TOPIC_VOTED_SUCCESS',
        topic
    }

}

export function topicDeleteSuccess (id) {
    return {
        type: 'TOPIC_DELETE_SUCCESS',
        id
    }

}

export function getTopics() {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        return endpoints.getTopics()
            .then((response) => {
                if (response.status === 200) {
                    dispatch(topicsFetchSuccess(response.data))
                }
            })
            .catch((err) => console.log(err));
    };
}

export function addTopic(payload) {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        endpoints.addTopic(payload)
            .then((response) => {
                if (response.status === 200) {
                    dispatch(topicAddSuccess(response.data));
                    dispatch(getTopics());
                    notifySuccess('Topic added successfully');
                }
                // dispatch(itemsAreLoading(false));
            })
            .catch((err) => console.log(err));
    };
}

export function voteTopic (id, payload) {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        endpoints.voteTopic(id, payload)
            .then((response) => {
                if (response.status === 200) {
                    console.log('add topic', response.data);
                    dispatch(topicVoteSuccess(response.data));
                    notifySuccess('Topic voted successfully');
                    dispatch(getTopics());
                }
                // dispatch(itemsAreLoading(false));
            })
            .catch((err) => console.log(err));
    };
}

export function deleteTopic (id) {
    return (dispatch) => {
        // dispatch(itemsAreLoading(true));

        endpoints.deleteTopic(id)
            .then((response) => {
                if (response.status === 200) {
                    console.log('add topic', response.data);
                    dispatch(topicDeleteSuccess(response.data));
                    notifySuccess('Topic deleted successfully');
                    dispatch(getTopics());
                }
                // dispatch(itemsAreLoading(false));
            })
        .catch((err) => console.log(err));
    };
}
