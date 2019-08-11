import {GET_ALL_PROJECTS, GET_PROJECT_BY_ID} from "./actionTypes";

export const getGetAllProjectAction = (projects) => ({
    type: GET_ALL_PROJECTS,
    projects: projects,
});

export const getGetProjectByIdAction = (project) => ({
    type: GET_PROJECT_BY_ID,
    projects: project,
});
