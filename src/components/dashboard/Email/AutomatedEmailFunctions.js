import axios from "axios";

export function proposalSentConfirmation(client, secondaryClient) {
  axios
    .post(`http://35.197.167.244/message`, {
      from: "thissupervisor",
      to: client,
      subject: "Proposal Submission Confirmation",
      html: "<p>testttt</p>",
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
        from: "thissupervisor",
        to: client,
        subject: "Proposal Outcome",
        html:
          "<h1>The outcome</h1>" +
          "<p>Your proposal has been rejected due to this reason: " +
          responseText,
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
        from: "thissupervisor",
        to: client,
        subject: "Proposal Outcome",
        html:
          "<h1>The outcome</h1>" +
          "<p>Your proposal has been accepted due to this reason: " +
          responseText +
          "Please wait for further instructions",
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
