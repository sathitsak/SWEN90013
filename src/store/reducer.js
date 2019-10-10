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
    GET_ALL_CLIENTS,
    GET_ALL_PRODUCTS
} from "./actionTypes";
import {
    updateProject,
    updateProduct,
    postNewProduct,
    updateClient,
    addNote,
    changeProposalStatus,
    updateProposal
} from "../api";

const defaultState = {
    projects: [],
    project: {},
    supervisors: [],
    proposals: [],
    proposal: {},
    page_title: "",
    client: {},
    clients: [],
    subjects: [],
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

    if (action.type === GET_ALL_PROPOSALS) {
        return getAllProposals(state, action);
    }

    if (action.type === GET_PROPOSAL_BY_ID) {
        return getProposalById(state, action);
    }

    if (action.type === GET_ALL_SUBJECTS) {
        return getAllSubjects(state, action);
    }

    if (action.type === UPDATE_PROJECT) {
        return updateProjectById(state, action);
    }

    if (action.type === UPDATE_PRODUCT) {
        return updateProductById(state, action);
    }

    if (action.type === CREATE_NEW_PRODUCT) {
        return createProduct(state, action);
    }

    if (action.type === UPDATE_CLIENT) {
        return updateClientById(state, action);
    }

    if (action.type === ADD_NOTE) {
        return addNoteByType(state, action);
    }

    if (action.type === CHANGE_PROPOSAL_STATUS) {
        return changeProposalStatusByType(state, action);
    }

    if (action.type === GET_CLIENT_BY_ID) {
        return getClientById(state, action);
    }

    if (action.type === UPDATE_PROPOSAL) {
        return updateProposalById(state, action);
    }

    if (action.type === GET_ALL_CLIENTS) {
        return getAllClients(state, action);
    }

    if (action.type === GET_ALL_PRODUCTS) {
        return getAllProducts(state, action);
    }

    return state;
};

function getAllSubjects(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.subjects = action.subjects;
    return newState;
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
    return newState;
}

function getSupervisors(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.supervisors = action.supervisors;
    return newState;
}

function updateProjectById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.project = action.project;
    updateProject(action.id, action.project);
    return newState;
}

function updateProductById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    updateProduct(action.id, action.product);
    return newState;
}

function createProduct(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    postNewProduct(action.product);
    return newState;
}

function updateClientById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    updateClient(action.id, action.client);
    return newState;
}

function addNoteByType(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    addNote(action.objectType, action.objectId, action.object);
    return newState;
}

function changeProposalStatusByType(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    changeProposalStatus(action.id, action.option, action.object);
    return newState;
}

function getClientById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.client = action.client;
    return newState;
}

function updateProposalById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.proposal = action.proposal;
    updateProposal(action.id, action.proposal);
    return newState;
}

function getAllClients(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.clients = action.clients;
    newState.page_title = action.page_title;
    return newState;
}

function getAllProducts(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.page_title = action.page_title;
    return newState;
}