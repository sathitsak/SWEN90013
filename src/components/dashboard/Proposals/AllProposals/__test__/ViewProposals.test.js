import Proposals from "../Proposals";

const ProposalsTest = new Proposals();

const proposals = [
  {
    id: "proposal1",
    name: "Tesla",
    status: "new"
  },
  {
    id: "proposal2",
    status: "approved"
  }
];

it("check first letter splicing", () => {
  expect(ProposalsTest._getFirstCharacter(proposals[0].name)).toBe("T");
});
