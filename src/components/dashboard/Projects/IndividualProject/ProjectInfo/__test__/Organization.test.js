import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import Organization from "../Organization";

describe('<Organization />', () => {
    let shallow;
    let wrapper;
    let instance;

    let orgName = "orgName";

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <Organization
                orgName={orgName}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('orgName: "orgName"', () => {
            expect(instance.props.orgName).toEqual("orgName");
        });
    });

});