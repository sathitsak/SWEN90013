import {
    GET_ALL_PROJECTS,
    GET_PROJECT_BY_ID,
    GET_SUPERVISORS,
    SET_CURRENT_SUPERVISOR,
    GET_ALL_PROPOSALS,
    GET_PROPOSAL_BY_ID
} from "./actionTypes";

const defaultState = {
    projects: [],
    project: {},
    supervisors: [],
    currentSupervisor: "",
    proposals: [],
    proposal: {},
};

export default (state = defaultState, action) => {
    if (action.type === GET_ALL_PROJECTS) {
        return getAllProjects(state, action);
    }

    if (action.type === GET_PROJECT_BY_ID) {
        return getProjectById(state, action);
    }

    if (action.type === GET_SUPERVISORS) {
        return getSupervisors(state, action);
    }

    if (action.type === SET_CURRENT_SUPERVISOR) {
        return setCurrentSupervisor(state, action);
    }

    if (action.type === GET_ALL_PROPOSALS) {
        return getAllProposals(state, action);
    }

    if (action.type === GET_PROPOSAL_BY_ID) {
        return getProposalById(state, action);
    }

    return state;
}

function getProposalById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.proposal = action.proposal;
    return newState;
}

function getAllProposals(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.proposals = action.proposals;
    return newState;
}

function setCurrentSupervisor(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.currentSupervisor = action.currentSupervisor;
    return newState;
}

function getAllProjects(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.projects = action.projects;
    return newState;
}

function getProjectById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.project = action.project;
    // console.log(action.project);
    return newState;
}

function getSupervisors(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.supervisors = action.supervisors;
    // console.log(action.supervisors);
    return newState;
}