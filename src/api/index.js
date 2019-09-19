import ajax from "./ajax";

export const getProjectList = () =>
  ajax("http://172.26.88.142:3000/api/project");

export const getProjectById = id =>
  ajax("http://172.26.88.142:3000/api/project/" + id);

export const getSupervisors = () =>
  ajax("http://172.26.88.142:3000/api/supervisor");

export const getProposalList = () =>
  ajax("http://172.26.88.142:3000/api/proposal");

export const getProposalById = id =>
  ajax("http://172.26.88.142:3000/api/proposal/" + id);

export const getAllSubjects = () =>
  ajax("http://172.26.88.142:3000/api/subject");

export const getProductById = id =>
  ajax("http://172.26.88.142:3000/api/product/" + id);

export const updateProject = (id, project) =>
  ajax("http://172.26.88.142:3000/api/project/" + id, project, "PUT");

export const updateProduct = (id, product) =>
  ajax("http://172.26.88.142:3000/api/product/" + id, product, "PUT");

export const postNewProduct = product =>
  ajax("http://172.26.88.142:3000/api/product", product, "POST");
