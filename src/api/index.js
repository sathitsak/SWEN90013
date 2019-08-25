import ajax from "./ajax";

// const BASE_URL = '/api';

//ZHU mockAPI
// export const getProjectList = () =>
//   ajax("http://5ce928eda8c1ee0014c7045b.mockapi.io/projects");

//CHAMIRA mockAPI

export const getProjectList = () =>
  ajax("http://5ce928eda8c1ee0014c7045b.mockapi.io/projects");

export const getProjectById = id =>
  ajax("http://5ce928eda8c1ee0014c7045b.mockapi.io/projects" + id);

export const getSupervisors = () =>
  ajax("http://5ce928eda8c1ee0014c7045b.mockapi.io/supervisors");

export const getProposalList = () =>
  ajax("http://localhost:13000/api/proposal");

export const getProposalById = id =>
  ajax("http://localhost:13000/api/proposal/" + id);
