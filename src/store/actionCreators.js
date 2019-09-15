import {
    GET_ALL_PROJECTS,
    GET_PROJECT_BY_ID,
    GET_SUPERVISORS,
    SET_CURRENT_SUPERVISOR,
    GET_ALL_PROPOSALS,
    GET_PROPOSAL_BY_ID,
    GET_CLIENT_BY_ID,
    GET_ALL_SUBJECTS,
} from "./actionTypes";

export const getGetAllProjectAction = (projects) => ({
    type: GET_ALL_PROJECTS,
    projects: projects,
    page_title: "View Projects",
});

export const getGetProjectByIdAction = (project) => ({
    type: GET_PROJECT_BY_ID,
    project: project,
    page_title: project.projectName,
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
    page_title: "View Proposals",
});

export const getGetProposalByIdAction = (proposal) => ({
    type: GET_PROPOSAL_BY_ID,
    proposal: proposal,
    page_title: proposal.name,
});

export const getGetClientByIdAction = (client) => ({
    type: GET_CLIENT_BY_ID,
    client: client,
});

export const getGetAllSubjectsAction = (subjects) => ({
    type: GET_ALL_SUBJECTS,
    subjects: subjects,
})