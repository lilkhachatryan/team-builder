import axios from "../plugins/axios";

export const login = (data) => axios.post('users/login', data);
export const register = (data) => axios.post('users/register', data);
export const logout = () => axios.get('users/logout');

export const getCompanies = () => axios.get('companies');

export const getUser = () => axios.get('users');
export const updateUser = (data) => axios.put('users/update', data);

export const getTopics = () => axios.get('topics');
export const addTopic = (data) => axios.post('topics', data);
export const voteTopic = (id, data) => axios.post(`topics/${id}/voting`, data);
export const deleteTopic = (id) => axios.delete(`topics/${id}`);


export const getProjects = () => axios.get('projects');
// /projects/:id/voting

export const voteProject = (id, data) => axios.post(`projects/${id}/voting`, data);

