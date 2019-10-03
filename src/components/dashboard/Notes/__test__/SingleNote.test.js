import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import SingleNote from "../SingleNote";

describe('<SingleNote />', () => {
    let shallow;
    let wrapper;
    let instance;

    const note = {
        text: "hello",
        date: "2019.10.3"
    };

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <SingleNote
                note={note}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('note: text => "hello"', () => {
            expect(instance.props.note.text).toEqual("hello");
        });

        it('note: date => "2019.10.3"', () => {
            expect(instance.props.note.date).toEqual("2019.10.3");
        });
    });
});