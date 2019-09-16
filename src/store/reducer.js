import {
    GET_ALL_PROJECTS,
    GET_PROJECT_BY_ID,
    GET_SUPERVISORS,
    SET_CURRENT_SUPERVISOR,
    GET_ALL_PROPOSALS,
    GET_PROPOSAL_BY_ID, 
    GET_CLIENT_BY_ID, 
    GET_PRODUCT_BY_ID,
} from "./actionTypes";
import {getSetCurrentSupervisorAction} from "./actionCreators";
import store from "./index";
import {func} from "prop-types";

const defaultState = {
    projects: [],
    project: {},
    supervisors: [],
    currentSupervisor: "",
    proposals: [],
    proposal: {},
    page_title: "",
    client: {},
    product: "",
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

    if (action.type === GET_CLIENT_BY_ID) {
        return getClientById(state, action);
    }

    if (action.type === GET_PRODUCT_BY_ID) {
        return getProductById(state, action);
    }

    return state;
}

function getProposalById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.proposal = action.proposal;
    newState.page_title = action.page_title;
    return newState;
}

function getAllProposals(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.proposals = action.proposals;
    newState.page_title = action.page_title;
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
    newState.page_title = action.page_title;
    return newState;
}

function getProjectById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.project = action.project;
    newState.page_title = action.page_title;

    const supervisorID = newState.project.supervisorID;

    let currentSupervisor = "";
    newState.supervisors.forEach((supervisor) => {
        if (supervisor.id === supervisorID) {
            currentSupervisor = supervisor.firstName + " " + supervisor.lastName;
            newState.currentSupervisor = currentSupervisor;
        }
    });
    return newState;

}

function getSupervisors(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.supervisors = action.supervisors;
    // console.log(action.supervisors);
    return newState;
}

function getClientById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.client = action.client;
    return newState;
}

function getProductById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.product = action.product[0];
    return newState;
}