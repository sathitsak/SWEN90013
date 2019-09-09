import ajax from "./ajax";

// const BASE_URL = '/api';

// export const getProjectList = () => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects');
export const getProjectList = () => ajax('http://localhost:13000/api/project');

// export const getProjectById = (id) => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects/' + id);
export const getProjectById = (id) => ajax('http://localhost:13000/api/project/' + id);

export const getSupervisors = () => ajax('https://5ce928eda8c1ee0014c7045b.mockapi.io/supervisors');

export const getProposalList = () => ajax('http://localhost:13000/api/proposal');

export const getProposalById = (id) => ajax('http://localhost:13000/api/proposal/' + id);


