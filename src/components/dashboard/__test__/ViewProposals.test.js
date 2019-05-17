import { shallow } from "enzyme";
import React from "react";
import ViewProposals from "./ViewProposals";



describe("Test new filtering", () => {
  it("should return only proposals with new status", () => {
    const wrapper = shallow(<ViewProposals />);
    const instance = wrapper.instance();
    expect(instance.filterProposals("new")).toEqual(proposalsNew);
  });
});

describe("Test approved filtering", () => {
  it("should return only proposals with approved status", () => {
    const wrapper = shallow(<ViewProposals />);
    const instance = wrapper.instance();
    expect(instance.filterProposals("approved")).toEqual(proposalsApproved);
  });
});

const proposalsNew = [
  {
    title: "Hampers for the Homeless",
    client: "Stephanie Armther",
    organisation: "Food4Poor",
    status: "new",
    supervisor: "Eduardo"
  },
  {
    title: "Fire Quiz App",
    client: "Mike Poloni",
    organisation: "FBE",
    status: "new",
    supervisor: "Eduardo"
  },
  {
    title: "Hospital Scheduling",
    organisation: "St Vincents",
    client: "Lori Platoon",
    status: "new",
    supervisor: "Greg"
  }
];

const proposalsApproved = [
  {
    title: "PMS",
    organisation: "UniMelb",
    client: "Philip Dart",
    status: "approved",
    supervisor: "Greg"
  },
  {
    title: "Stroke Rehab",
    organisation: "UniMelb Eng",
    client: "Vincent Petersbourg",
    status: "approved",
    supervisor: "Linda"
  }
];
