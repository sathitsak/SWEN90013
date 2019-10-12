import axios from 'axios';
import {baseURL} from "../../api/index" 

export function nameValidator(name){
  var letters = /^[A-Za-z]+$/;
  if(name.value.match(letters)) {
    return true;
  } else {
    return false; 
  }
}

export function deleteSupervisorMethod(id) {
  axios.delete('http://35.244.89.250/supervisor/'+id)
  .then(response => {
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function deleteCoordinatorMethod(id) {
  axios.delete('http://35.244.89.250/coordinator/'+id)
  .then(response => {
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function deleteSubjectMethod(id) {
  axios.delete('http://35.244.89.250/subject/'+id, {
    data: {
      soft: "1"
    }
  })
  .then(response => {
  })
  .catch(function (error) {
    console.log(error);
  });
}



export function addNewSubject(name, code, semester) {
    axios.post(baseURL+'/subject', {
        name: name,
	    code: code,
	    semester: semester
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
} 

export function addNewCoordinator(firstName, lastName, email, contactNumber, officeLocation, subject) {
    axios.post(baseURL+'/coordinator', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        contactNumber: contactNumber,
        officeLocation: officeLocation, 
        subjectId: subject
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export function addNewSupervisor(firstName, lastName, email, contactNumber, officeLocation, subject) {
    axios.post(baseURL+'/supervisor', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        contactNumber: contactNumber,
        officeLocation: officeLocation, 
        subjectId: subject
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}