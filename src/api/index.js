import ajax from "./ajax";

// const BASE_URL = '/api';

export const getProjectList = () => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects');

export const getProjectById = (id) => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects/' + id);

export const getSupervisors = () => ajax('https://5ce928eda8c1ee0014c7045b.mockapi.io/supervisors');

// export const getProposalList = () => ajax('http://localhost:13000/api/proposal');
export const getProposalList = () => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/proposal');


export const getProposalById = (id) => ajax('http://localhost:13000/api/proposal/' + id);


