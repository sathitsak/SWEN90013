import {GET_ALL_PROJECTS,GET_PROJECT_BY_ID} from "./actionTypes";

const defaultState = {
    projects: [],
    project: {},
};

export default (state = defaultState, action) => {
    if (action.type === GET_ALL_PROJECTS) {
        return getAllProjects(state, action);
    }

    if (action.type === GET_PROJECT_BY_ID) {
        return getProjectById(state, action);
    }

    return state;
}

function getAllProjects(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.projects = action.projects;
    return newState;
}

function getProjectById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.project = action.project;
    console.log(action.project);
    return newState;
}