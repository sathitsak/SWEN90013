import {
    GET_ALL_PROJECTS,
    GET_PROJECT_BY_ID,
    GET_SUPERVISORS,
    SET_CURRENT_SUPERVISOR,
    GET_ALL_PROPOSALS,
    GET_PROPOSAL_BY_ID
} from "./actionTypes";

export const getGetAllProjectAction = (projects) => ({
    type: GET_ALL_PROJECTS,
    projects: projects,
});

export const getGetProjectByIdAction = (project) => ({
    type: GET_PROJECT_BY_ID,
    project: project,
});

export const getGetSupervisorsAction = (supervisors) => ({
    type: GET_SUPERVISORS,
    supervisors: supervisors,
});

export const getSetCurrentSupervisorAction = (currentSupervisor) => ({
    type: SET_CURRENT_SUPERVISOR,
    currentSupervisor: currentSupervisor,
});

export const getGetAllProposalsAction = (proposals) => ({
    type: GET_ALL_PROPOSALS,
    proposals: proposals,
});

export const getGetProposalByIdAction = (proposal) => ({
    type: GET_PROPOSAL_BY_ID,
    proposal: proposal,
});
