import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import StatusChangeModal from "../StatusChangeModal";

describe('<StatusChangeModal />', () => {
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
            <StatusChangeModal
                id={proposal._id}
                subjects={subjects}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('id: "1"', () => {
            expect(instance.props.id).toEqual("1");
        });

        it('subjects: length => 3', () => {
            expect(instance.props.subjects.length).toEqual(3);
        })
    });

});