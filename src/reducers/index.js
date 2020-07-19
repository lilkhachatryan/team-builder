import { combineReducers } from 'redux';
import { users } from "./users";
import { topics } from "./topics";
import { projects } from "./projects";

export default combineReducers({
    user: users,
    topics,
    projects
});
