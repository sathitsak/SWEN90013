import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import ClientDetails from "../ClientDetails";

describe('<ClientDetails />', () => {
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
            <ClientDetails
                email={client.email}
                technicalAbility={client.technicalAbility}
                contactNumber={client.contactNumber}
                orgNumber={client.organisation.size}
                secondaryContactName={client.secondaryContactFirstName + " " + client.secondaryContactLastName}
                secondaryContactEmail={client.secondaryContactEmail}
                secondaryContactNumber={client.secondaryContactNumber}
                flag={client.flag}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('email: "foo@gmail.com"', () => {
            expect(instance.props.email).toEqual("foo@gmail.com");
        });

        it('technicalAbility: "3"', () => {
            expect(instance.props.technicalAbility).toEqual("3");
        });

        it('contactNumber: "0451720603"', () => {
            expect(instance.props.contactNumber).toEqual("0451720603");
        });

        it('orgNumber: "300"', () => {
            expect(instance.props.orgNumber).toEqual("300");
        });

        it('secondaryContactName: "secondaryContactFirstName secondaryContactLastName"', () => {
            expect(instance.props.secondaryContactName).toEqual("secondaryContactFirstName secondaryContactLastName");
        });

        it('secondaryContactEmail: "foo2@gmail.com"', () => {
            expect(instance.props.secondaryContactEmail).toEqual("foo2@gmail.com");
        });

        it('secondaryContactNumber: "0451720603"', () => {
            expect(instance.props.secondaryContactNumber).toEqual("0451720603");
        });

        it('flag: true', () => {
            expect(instance.props.flag).toBeTruthy();
        });

    });
});