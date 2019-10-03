import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import TeamArtefacts from "../TeamArtefacts";

describe('<TeamArtefacts />', () => {
    let shallow;
    let wrapper;
    let instance;

    let students = [];
    let productLinks = [];
    let technologies = [];

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <TeamArtefacts
                students={students}
                productLinks={productLinks}
                technologies={technologies}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {

        it('students: empty', () => {
            expect(instance.props.students.length).toEqual(0);
        });

        it('productLinks: empty', () => {
            expect(instance.props.productLinks.length).toEqual(0);
        });

        it('technologies: empty', () => {
            expect(instance.props.technologies.length).toEqual(0);
        });
    });

});