import ajax from "./ajax";

export const getProjectList = () => ajax('http://localhost:13000/api/project');

export const getProjectById = (id) => ajax('http://localhost:13000/api/project/' + id);

export const getSupervisors = () => ajax('http://localhost:13000/api/supervisor');

export const getProposalList = () => ajax('http://localhost:13000/api/proposal');

export const getProposalById = (id) => ajax('http://localhost:13000/api/proposal/' + id);

export const getAllSubjects = () => ajax('http://localhost:13000/api/subject');

export const getProductById = (id) => ajax('http://localhost:13000/api/product/' + id);

export const updateProject = (id, project) => ajax('http://localhost:13000/api/project/' + id, project, 'PUT');

export const updateProduct = (id, product) => ajax('http://localhost:13000/api/product/' + id, product, 'PUT');

export const postNewProduct = (product) => ajax('http://localhost:13000/api/product', product, 'POST');
