import {
    GET_ALL_PROJECTS,
    GET_PROJECT_BY_ID,
    GET_SUPERVISORS,
    GET_ALL_PROPOSALS,
    GET_PROPOSAL_BY_ID,
    GET_CLIENT_BY_ID,
    GET_ALL_SUBJECTS,
    UPDATE_PROJECT
} from "./actionTypes";
import {updateProject} from "../api";

const defaultState = {
    projects: [],
    project: {},
    supervisors: [],
    proposals: [],
    proposal: {},
    page_title: "",
    client: {},
    subjects: []
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

  if (action.type === GET_CLIENT_BY_ID) {
      return getClientById(state, action);
  }

  if (action.type === GET_ALL_SUBJECTS) {
      return getAllSubjects(state, action);
  }

  if (action.type === UPDATE_PROJECT) {
      return updateProjectById(state, action);
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
  const supervisorID = newState.project.supervisorID;

  let currentSupervisor = "";
  newState.supervisors.forEach(supervisor => {
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
    return newState;
}

function getClientById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.client = action.client;
    return newState;
}

function updateProjectById(state, action) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.project = action.project;
    updateProject(action.id, action.project);
    return newState;
}
