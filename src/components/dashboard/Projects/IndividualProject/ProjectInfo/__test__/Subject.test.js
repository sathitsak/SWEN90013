import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import Subject from "../Subject";

describe('<Subject />', () => {
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
        clientId: "1",
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
            <Subject
                proposal={proposal}
                subjects={subjects}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
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

        it('proposal: clientId => "1"', () => {
            expect(instance.props.proposal.clientId).toEqual("1");
        });

        it('proposal: subjectId => "1"', () => {
            expect(instance.props.proposal.subjectId).toEqual("1");
        });

        it('subjects: length => 3', () => {
            expect(instance.props.subjects.length).toEqual(3);
        })
    });

});