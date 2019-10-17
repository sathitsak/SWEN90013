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

export function addTemplate(id, title, message) {
  axios.post(baseURL+'/template/' + id, {
    title: title,
    message: message
  })
}



export function deleteSupervisorMethod(id) {
  axios.delete(baseURL+'/supervisor/'+id)
  .then(response => {
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function deleteCoordinatorMethod(id) {
  axios.delete(baseURL+'/coordinator/'+id)
  .then(response => {
  })
  .catch(function (error) {
    console.log(error);
  });
}

export function deleteSubjectMethod(id) {
  axios.delete(baseURL+'/subject/'+id, {
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