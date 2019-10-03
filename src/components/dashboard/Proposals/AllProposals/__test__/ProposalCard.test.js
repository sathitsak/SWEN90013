import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import ProposalCard from "../ProposalCard";

describe('<ProposalCard />', () => {
    let shallow;
    let wrapper;
    let instance;

    let proposal = {
        _id: "1",
        name: "name",
        outlineOfProject: "outlineOfProject",
        endProductBenefits: "endProductBenefits",
        endProductUse: "endProductUse",
        beneficiaries: "beneficiaries",
        originality: "originality",
        client: {
            _id: "1",
            firstName: "firstName",
            lastName: "lastName",
            email: "foo@mail.com",
            contactNumber: "0451720603",
            organisation: {
                name: "org",
                size: "300",
                industry: "industry",
                description: "description",
            },
            technicalAbility: "3",
            secondaryContactFirstName: "secondaryContactFirstName",
            secondaryContactLastName: "secondaryContactLastName",
            secondaryContactEmail: "foo2@mail.com",
            secondaryContactNumber: "0451720603",
            flag: "true",
            notes: [],
        },
        subjectId: "1",
        notes: [],
    };
    let subjects = [
        {
            _id: 1,
            name: "name1"
        },
        {
            _id: 2,
            name: "name2"
        },
        {
            _id: 3,
            name: "name3"
        },
    ];

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <ProposalCard
                id={proposal._id}
                proposal={proposal}
                subjects={subjects}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('id: "1"', () => {
            expect(instance.props.id).toEqual("1");
        });

        it('proposal: _id => "1"', () => {
            expect(instance.props.proposal._id).toEqual("1");
        });

        it('proposal: name => "name"', () => {
            expect(instance.props.proposal.name).toEqual("name");
        });

        it('proposal: outlineOfProject => "outlineOfProject"', () => {
            expect(instance.props.proposal.outlineOfProject).toEqual("outlineOfProject");
        });

        it('proposal: endProductBenefits => "endProductBenefits"', () => {
            expect(instance.props.proposal.endProductBenefits).toEqual("endProductBenefits");
        });

        it('proposal: endProductUse => "endProductUse"', () => {
            expect(instance.props.proposal.endProductUse).toEqual("endProductUse");
        });

        it('proposal: beneficiaries => "beneficiaries"', () => {
            expect(instance.props.proposal.beneficiaries).toEqual("beneficiaries");
        });

        it('proposal: originality => "originality"', () => {
            expect(instance.props.proposal.originality).toEqual("originality");
        });

        it('client: _id => "1"', () => {
            expect(instance.props.proposal.client._id).toEqual("1");
        });

        it('client: firstName => "firstName"', () => {
            expect(instance.props.proposal.client.firstName).toEqual("firstName");
        });

        it('client: lastName => "lastName"', () => {
            expect(instance.props.proposal.client.lastName).toEqual("lastName");
        });

        it('client: email => "foo@mail.com"', () => {
            expect(instance.props.proposal.client.email).toEqual("foo@mail.com");
        });

        it('client: contactNumber => "0451720603"', () => {
            expect(instance.props.proposal.client.contactNumber).toEqual("0451720603");
        });

        it('client: organisation.name => "org"', () => {
            expect(instance.props.proposal.client.organisation.name).toEqual("org");
        });

        it('client: organisation.size => "300"', () => {
            expect(instance.props.proposal.client.organisation.size).toEqual("300");
        });

        it('client: organisation.industry => "industry"', () => {
            expect(instance.props.proposal.client.organisation.industry).toEqual("industry");
        });

        it('client: organisation.description => "description"', () => {
            expect(instance.props.proposal.client.organisation.description).toEqual("description");
        });

        it('client: technicalAbility => "3"', () => {
            expect(instance.props.proposal.client.technicalAbility).toEqual("3");
        });

        it('client: secondaryContactFirstName => "secondaryContactFirstName"', () => {
            expect(instance.props.proposal.client.secondaryContactFirstName).toEqual("secondaryContactFirstName");
        });

        it('client: secondaryContactLastName => "secondaryContactLastName"', () => {
            expect(instance.props.proposal.client.secondaryContactLastName).toEqual("secondaryContactLastName");
        });

        it('client: secondaryContactEmail => "foo2@mail.com"', () => {
            expect(instance.props.proposal.client.secondaryContactEmail).toEqual("foo2@mail.com");
        });

        it('client: secondaryContactNumber => "0451720603"', () => {
            expect(instance.props.proposal.client.secondaryContactNumber).toEqual("0451720603");
        });

        it('client: flag => "true"', () => {
            expect(instance.props.proposal.client.flag).toBeTruthy();
        });

        it('client: notes => empty', () => {
            expect(instance.props.proposal.client.notes.length).toEqual(0);
        });

        it('proposal: subjectId => "1"', () => {
            expect(instance.props.proposal.subjectId).toEqual("1");
        });

        it('subjects: length => 3', () => {
            expect(instance.props.subjects.length).toEqual(3);
        })
    });

});