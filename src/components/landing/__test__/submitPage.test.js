import React from "react";
import SubmitPage from "../SubmitPage";

const SubmitPageTest = new SubmitPage();

it("Test ValidateEmail function by inject valid and invalid email ", () => {
  const validEmail = "test@unimelb.edu.au";
  const invalidEmail = "foo@bar";

  expect(SubmitPageTest.ValidateEmail(validEmail)).toBe(true);
  expect(SubmitPageTest.ValidateEmail(invalidEmail)).toBe(false);
});

it("Test ValidateContactInfo function by inject valid and invalid phone number ", () => {
  const valideNumber = "0403111111";
  const invalidNumber = "9111 11111";
  const empty = "";

  expect(SubmitPageTest.ValidateContactInfo(valideNumber)).toBe(true);
  expect(SubmitPageTest.ValidateContactInfo(invalidNumber)).toBe(false);
  expect(SubmitPageTest.ValidateContactInfo(empty)).toBe(false);
});

it("Validate client info", () => {
  const input = {
    firstname: "sathitsak",
    lastname: "anawatmongkol",
    email: "sathitsak@gmail.com",
    number: "0403111111",
    officeNumber: "0403111111",
    technical: "5"
  };
  expect(SubmitPageTest.checkClient(input)).toBe(true);
});

it("Validate secondary contact info", () => {
  const input = {
    ci2firstname: "sathitsak",
    ci2lastname: "anawatmongkol",
    ci2email: "sathitsak@gmail.com",
    ci2number: "0403111111"
  };
  expect(SubmitPageTest.checkSecondaryContact(input)).toBe(true);
});

it("Validate orgranisation info", () => {
  const input = {
    organisationName: "sum industry",
    industryType: "world domination",
    size: "40000000",
    organisationBrief: "world domination"
  };
  expect(SubmitPageTest.checkOrganisationInfo(input)).toBe(true);
});

it("Validate proposal info", () => {
  const input = {
    outline: "we are going to build invisible cloak and use it to raid area 51",
    beneficiaries: "Aliens",
    benefits: "Hidden tech in area 51",
    used: "invisble cloak to pass the guard",
    projectName: "Freedom cloak"
  };
  expect(SubmitPageTest.checkOrganisationInfo(input)).toBe(true);
});
