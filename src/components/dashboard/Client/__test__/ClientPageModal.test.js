import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import ClientPageModal from "../ClientPageModal";

describe('<ClientPageModal />', () => {
    let shallow;
    let wrapper;
    let instance;

    const client = {
        _id: "1",
        firstName: "firstName",
        lastName: "lastName",
        email: "foo@gmail.com",
        contactNumber: "0451720603",
        technicalAbility: "3",
        secondaryContactFirstName: "secondaryContactFirstName",
        secondaryContactLastName: "secondaryContactLastName",
        secondaryContactEmail: "foo2@gmail.com",
        secondaryContactNumber: "0451720603",
        notes: [],
        organisation: {
            name: "org",
            size: "300",
            industry: "industry",
            description: "description",
        },
        flag: "true",
    };

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <ClientPageModal
                clientFlag={client.flag}
                client={client}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('clientFlag: true', () => {
            expect(instance.props.clientFlag).toBeTruthy();
        });

        it('client: _id => "1"', () => {
            expect(instance.props.client._id).toEqual("1");
        });

        it('client: firstName => "firstName"', () => {
            expect(instance.props.client.firstName).toEqual("firstName");
        });

        it('client: lastName => "lastName"', () => {
            expect(instance.props.client.lastName).toEqual("lastName");
        });

        it('client: email => "foo@gmail.com"', () => {
            expect(instance.props.client.email).toEqual("foo@gmail.com");
        });

        it('client: contactNumber => "0451720603"', () => {
            expect(instance.props.client.contactNumber).toEqual("0451720603");
        });

        it('client: technicalAbility => "3"', () => {
            expect(instance.props.client.technicalAbility).toEqual("3");
        });

        it('client: secondaryContactFirstName => "secondaryContactFirstName"', () => {
            expect(instance.props.client.secondaryContactFirstName).toEqual("secondaryContactFirstName");
        });

        it('client: secondaryContactLastName => "secondaryContactLastName"', () => {
            expect(instance.props.client.secondaryContactLastName).toEqual("secondaryContactLastName");
        });

        it('client: secondaryContactEmail => "foo2@gmail.com"', () => {
            expect(instance.props.client.secondaryContactEmail).toEqual("foo2@gmail.com");
        });

        it('client: secondaryContactNumber => "0451720603"', () => {
            expect(instance.props.client.secondaryContactNumber).toEqual("0451720603");
        });

        it('client: notes => empty', () => {
            expect(instance.props.client.notes.length).toEqual(0);
        });

        it('client: organisation.name => "org"', () => {
            expect(instance.props.client.organisation.name).toEqual("org");
        });

        it('client: organisation.size => "300"', () => {
            expect(instance.props.client.organisation.size).toEqual("300");
        });

        it('client: organisation.industry => "industry"', () => {
            expect(instance.props.client.organisation.industry).toEqual("industry");
        });

        it('client: organisation.description => "description"', () => {
            expect(instance.props.client.organisation.description).toEqual("description");
        });
    });
});