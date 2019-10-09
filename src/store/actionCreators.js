import {
    GET_ALL_PROJECTS,
    GET_PROJECT_BY_ID,
    GET_SUPERVISORS,
    GET_ALL_PROPOSALS,
    GET_PROPOSAL_BY_ID,
    GET_ALL_SUBJECTS,
    UPDATE_PROJECT,
    UPDATE_PRODUCT,
    CREATE_NEW_PRODUCT,
    UPDATE_CLIENT,
    ADD_NOTE,
    CHANGE_PROPOSAL_STATUS,
    GET_CLIENT_BY_ID,
    UPDATE_PROPOSAL,
    GET_ALL_CLIENTS
} from "./actionTypes";

export const getAllProjectAction = projects => ({
    type: GET_ALL_PROJECTS,
    projects: projects,
    page_title: "View Projects"
});

export const getProjectByIdAction = project => ({
    type: GET_PROJECT_BY_ID,
    project: project,
    page_title: project.name
});

export const getSupervisorsAction = supervisors => ({
    type: GET_SUPERVISORS,
    supervisors: supervisors
});

export const getAllProposalsAction = proposals => ({
    type: GET_ALL_PROPOSALS,
    proposals: proposals,
    page_title: "View Proposals"
});

export const getProposalByIdAction = proposal => ({
    type: GET_PROPOSAL_BY_ID,
    proposal: proposal,
    page_title: proposal.name,
});

export const getAllSubjectsAction = subjects => ({
    type: GET_ALL_SUBJECTS,
    subjects: subjects,
});

export const updateProjectAction = (id, project) => ({
    type: UPDATE_PROJECT,
    id: id,
    project: project,
    page_title: project.name
});

export const updateProductAction = (id, product) => ({
    type: UPDATE_PRODUCT,
    id: id,
    product: product
});

export const createNewProductAction = (product) => ({
    type: CREATE_NEW_PRODUCT,
    product: product
});

export const updateClientAction = (id, client) => ({
    type: UPDATE_CLIENT,
    id: id,
    client: client
});

export const addNoteAction = (objectType, objectId, object) => ({
    type: ADD_NOTE,
    objectType: objectType,
    objectId: objectId,
    object: object
});

export const changeProposalStatusAction = (id, option, object) => ({
    type: CHANGE_PROPOSAL_STATUS,
    id: id,
    option: option,
    object: object
});

export const getClientByIdAction = client => ({
    type: GET_CLIENT_BY_ID,
    client: client,
});

export const updateProposalAction = (id, proposal) => ({
    type: UPDATE_PROPOSAL,
    id: id,
    proposal: proposal,
    page_title: proposal.name
});

export const getAllClientsAction = clients => ({
    type: GET_ALL_CLIENTS,
    clients: clients,
    page_title: "View Clients"
});

