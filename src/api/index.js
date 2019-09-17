import ajax from "./ajax";

export const getProjectList = () => ajax('http://localhost:13000/api/project');

export const getProjectById = (id) => ajax('http://localhost:13000/api/project/' + id);

export const getSupervisors = () => ajax('http://localhost:13000/api/supervisor');

export const getProposalList = () => ajax('http://localhost:13000/api/proposal');

export const getProposalById = (id) => ajax('http://localhost:13000/api/proposal/' + id);

export const getClients = () => ajax('http://localhost:13000/api/client');

export const getClientById = (id) => ajax('http://localhost:13000/api/client/' + id);

export const getAllSubjects = () => ajax('http://localhost:13000/api/subject');

export const getProductById = (id) => ajax('http://localhost:13000/api/product/' + id);

export const updateProject = (id, project) => ajax('http://localhost:13000/api/project/' + id, project, 'PUT');
