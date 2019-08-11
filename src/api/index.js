import ajax from "./ajax";

// const BASE_URL = '/api';

export const getProjectList = () => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects');

export const getProjectById = (id) => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects/' + id);