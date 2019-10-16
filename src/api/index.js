import ajax from "./ajax";

const reqType = {
    get: 'GET',
    post: 'POST',
    put: 'PUT',
};

export const baseURL = 'http://localhost:13000/api';

// export const baseURL = 'http://172.26.88.142:3000/api';


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
export const updateProposal = (id, proposal) => ajax(baseURL + proposalURL + '/' + id, proposal, reqType.put);

// Subject related
const subjectURL = '/subject';
export const getAllSubjects = () => ajax(baseURL + subjectURL, reqType.get);

// Product related
const productURL = '/product';
export const updateProduct = (id, product) => ajax(baseURL + productURL + '/' + id, product, reqType.put);
export const postNewProduct = (product) => ajax(baseURL + productURL, product, reqType.post);
export const getAllProducts = () => ajax(baseURL + productURL, reqType.get);

// Client related
const clientURL = '/client';
export const getClientById = (id) => ajax(baseURL + clientURL + '/' + id, reqType.get);
export const updateClient = (id, client) => ajax(baseURL + clientURL + '/' + id, client, reqType.put);
export const getAllClients = () => ajax(baseURL + clientURL, reqType.get);

// Note related
export const addNote = (objectType, objectId, object) => ajax(baseURL + '/' + objectType + '/' + objectId, object, reqType.put);