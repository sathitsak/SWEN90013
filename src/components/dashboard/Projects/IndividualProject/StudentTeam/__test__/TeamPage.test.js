import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import TeamPage from "../TeamPage";

describe('<TeamPage />', () => {
    let shallow;
    let wrapper;
    let instance;

    let products = [];

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <TeamPage
                products={products}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('products: empty', () => {
            expect(instance.props.products.length).toEqual(0);
        });
    });

});