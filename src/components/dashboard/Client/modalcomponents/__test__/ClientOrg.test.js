import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import ClientOrg from "../ClientOrg";

describe('<ClientOrg />', () => {
    let shallow;
    let wrapper;
    let instance;

    const organisation = {
        name: "org",
        size: "300",
        industry: "industry",
        description: "description",
    };

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <ClientOrg
                orgName={organisation.name}
                orgSize={organisation.size}
                industry={organisation.industry}
                description={organisation.description}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('orgName: "org"', () => {
            expect(instance.props.orgName).toEqual("org");
        });

        it('orgSize: "300"', () => {
            expect(instance.props.orgSize).toEqual("300");
        });

        it('industry: "industry"', () => {
            expect(instance.props.industry).toEqual("industry");
        });

        it('description: "description"', () => {
            expect(instance.props.description).toEqual("description");
        });
    });
});