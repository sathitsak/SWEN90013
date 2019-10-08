import axios from 'axios';

const baseURL = 'http://localhost:13000/api';
// const baseURL = 'http://172.26.88.142:3000/api';



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