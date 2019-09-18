import {
    GET_ALL_PROJECTS,
    GET_PROJECT_BY_ID,
    GET_SUPERVISORS,
    GET_ALL_PROPOSALS,
    GET_PROPOSAL_BY_ID,
    GET_CLIENT_BY_ID,
    GET_ALL_SUBJECTS,
    UPDATE_PROJECT,
    UPDATE_PRODUCT,
    CREATE_NEW_PRODUCT
} from "./actionTypes";

export const getGetAllProjectAction = projects => ({
    type: GET_ALL_PROJECTS,
    projects: projects,
    page_title: "View Projects"
});

export const getGetProjectByIdAction = project => ({
    type: GET_PROJECT_BY_ID,
    project: project,
    page_title: project.name
});

export const getGetSupervisorsAction = supervisors => ({
    type: GET_SUPERVISORS,
    supervisors: supervisors
});

export const getGetAllProposalsAction = proposals => ({
    type: GET_ALL_PROPOSALS,
    proposals: proposals,
    page_title: "View Proposals"
});

export const getGetProposalByIdAction = proposal => ({
    type: GET_PROPOSAL_BY_ID,
    proposal: proposal,
    page_title: proposal.name,
});

export const getGetClientByIdAction = client => ({
    type: GET_CLIENT_BY_ID,
    client: client
});

export const getGetAllSubjectsAction = subjects => ({
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
