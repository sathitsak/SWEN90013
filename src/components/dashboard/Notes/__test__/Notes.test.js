import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import Notes from "../Notes";

describe('<Notes />', () => {
    let shallow;
    let wrapper;
    let instance;

    const notes = [];

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <Notes
                notes={notes}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('notes: empty', () => {
            expect(instance.props.notes.length).toEqual(0);
        });
    });
});