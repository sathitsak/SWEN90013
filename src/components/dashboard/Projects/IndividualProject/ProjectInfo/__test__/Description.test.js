import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import Description from "../Description";

describe('<Description />', () => {
    let shallow;
    let wrapper;
    let instance;

    let description = "description";

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <Description
                description={description}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('description: "description"', () => {
            expect(instance.props.description).toEqual("description");
        });
    });

});