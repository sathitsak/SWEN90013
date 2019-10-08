import ajax from "./ajax";

const reqType = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
};

 const baseURL = 'http://localhost:13000/api';
// const baseURL = 'http://172.26.88.142:3000/api';

// Project related
const projectURL = '/project';
export const getProjectList = () => ajax(baseURL + projectURL, reqType.get);
export const getProjectById = (id) => ajax(baseURL + projectURL + '/' + id, reqType.get);
export const updateProject = (id, project) => ajax(baseURL + projectURL + '/' + id, project, reqType.put);

// Supervisor related
const supervisorURL = '/supervisor';
export const getSupervisors = () => ajax(baseURL + supervisorURL, reqType.get);

// Proposal related
const proposalURL = '/proposal';
export const getProposalList = () => ajax(baseURL + proposalURL, reqType.get);
export const getProposalById = (id) => ajax(baseURL + proposalURL + '/' + id, reqType.get);
export const changeProposalStatus = (id, option, object) => ajax(baseURL + proposalURL + '/' + id + '/' + option, object, reqType.post);

// Subject related
const subjectURL = '/subject';
export const getAllSubjects = () => ajax(baseURL + subjectURL, reqType.get);

// Product related
const productURL = '/product';
export const updateProduct = (id, product) => ajax(baseURL + productURL + '/' + id, product, reqType.put);
export const postNewProduct = (product) => ajax(baseURL + productURL, product, reqType.post);

// Client related
const clientURL = '/client';
export const updateClient = (id, client) => ajax(baseURL + clientURL + '/' + id, client, reqType.put);

// Note related
export const addNote = (objectType, objectId, object) => ajax(baseURL + '/' + objectType + '/' + objectId, object, reqType.put);