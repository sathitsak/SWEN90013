import axios from "axios";

export function proposalSentConfirmation(
  client,
  secondaryClient,
  clientFirstName,
  secondaryClientFirstName
) {
  axios
    .post(`http://35.197.167.244/message`, {
      from: "CIS Project Management",
      to: client,
      subject: "Proposal Submission Confirmation",
      html:
        "<h1>Hi " +
        clientFirstName +
        "and " +
        secondaryClientFirstName +
        " </h1>" +
        "<p>Your proposal has been successfully sent! We will be reviewing your proposal and you will expect to hear an outcome in the" +
        " next few days. Please await further instructions. </p>" +
        "<p>Please do not reply to this message</p>",
      projectType: "Proposal",
      cc: secondaryClient
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
}

export function proposalOutcome(
  client,
  secondaryClient,
  outcome,
  responseText
) {
  if (outcome == "reject") {
    axios
      .post(`http://35.197.167.244/message`, {
        from: "CIS Project Management",
        to: client,
        subject: "Proposal Outcome",
        html:
          "<h1>The outcome</h1>" +
          "<p>Your proposal has been rejected due to this reason: " +
          "<p>" +
          responseText +
          "</p>" +
          "<p>Please feel free to contact the CIS department for more information</p>" +
          "<p>Please do not reply to this message</p>",
        projectType: "Proposal",
        cc: secondaryClient
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  } else if ((outcome = "accept")) {
    axios
      .post(`http://35.197.167.244/message`, {
        from: "CIS Project Management",
        to: client,
        subject: "Proposal Outcome",
        html:
          "<h1>Outcome of Proposal:</h1>" +
          "<p>Your proposal has been accepted due to this reason: " +
          "<p>" +
          responseText +
          "</p>" +
          "<p>A coordinator and supervisor will be in touch with you shortly. Please wait for further instructions</p>" +
          "<p>Please do not reply to this message</p>",
        projectType: "Proposal",
        cc: secondaryClient
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
}
