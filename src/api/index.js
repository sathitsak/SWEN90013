import ajax from "./ajax";

// const BASE_URL = '/api';

export const getProjectList = () => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects');

export const getProjectById = (id) => ajax('http://5ce928eda8c1ee0014c7045b.mockapi.io/projects/' + id);

export const getSupervisors = () => ajax('https://5ce928eda8c1ee0014c7045b.mockapi.io/supervisors');

export const getProposalList = () => ajax('https://5ce79b719f2c390014dba00f.mockapi.io/proposal/');

export const getProposalById = (id) => ajax('https://5ce79b719f2c390014dba00f.mockapi.io/proposal/' + id);