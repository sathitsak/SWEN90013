import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import ProjectCard from "../ProjectCard";

describe('<ProjectCard />', () => {
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
    let supervisors = [
        {
            _id: 1,
            firstName: "firstName1",
            lastName: "lastName1"
        },
        {
            _id: 2,
            firstName: "firstName2",
            lastName: "lastName2"
        },
        {
            _id: 3,
            firstName: "firstName3",
            lastName: "lastName3"
        },
    ];
    let subjects = [
        {
            _id: 1,
            name: "name1"
        },
        {
            _id: 2,
            name: "name2"
        },
        {
            _id: 3,
            name: "name3"
        },
    ];

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <ProjectCard
                _id={project._id}
                project={project}
                supervisors={supervisors}
                subjects={subjects}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {

        it('_id: "1"', () => {
            expect(instance.props._id).toEqual("1");
        });

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

        it('supervisors: length => 3', () => {
            expect(instance.props.supervisors.length).toEqual(3);
        });

        it('subjects: length => 3', () => {
            expect(instance.props.subjects.length).toEqual(3);
        })
    });

});