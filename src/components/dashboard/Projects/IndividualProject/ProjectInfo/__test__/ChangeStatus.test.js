import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import ChangeStatus from "../ChangeStatus";

describe('<ChangeStatus />', () => {
    let shallow;
    let wrapper;
    let instance;

    let project = {
        _id: "1",
        name: "name",
        supervisorId: "1",
        subjectId: "1",
        proposalId: "1",
        notes: [],
    };

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <ChangeStatus
                project={project}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {

        it('project: name => "name"', () => {
            expect(instance.props.project.name).toEqual("name");
        });

        it('project: supervisorId => "1"', () => {
            expect(instance.props.project.supervisorId).toEqual("1");
        });

        it('project: subjectId => "1"', () => {
            expect(instance.props.project.subjectId).toEqual("1");
        });

        it('project: proposalId => "1"', () => {
            expect(instance.props.project.proposalId).toEqual("1");
        });

        it('project: notes => empty', () => {
            expect(instance.props.project.notes.length).toEqual(0);
        });

    });

});