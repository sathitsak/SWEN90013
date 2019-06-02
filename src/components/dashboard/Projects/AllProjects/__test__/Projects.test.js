import React from 'react';
import {shallow} from 'enzyme';
import ViewProjects from '../Projects';

describe('<ViewProjects />', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<ViewProjects/>);
        instance = wrapper.instance();
    });

    describe('The filter function: _filterProjectsByStatus', () => {
        it('input status => new', () => {
            const projects = [
                {
                    id: 1,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
                {
                    id: 2,
                    status: 'in progress',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
                {
                    id: 3,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
            ];

            const expectResult = [
                {
                    id: 1,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
                {
                    id: 3,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
            ];

            wrapper.setState({projects: projects});
            expect(wrapper.state()).toEqual({projects: projects});
            expect(instance._filterProjectsByStatus('new')).toEqual(expectResult);
        });

        it('input status => in progress', () => {
            const projects = [
                {
                    id: 1,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
                {
                    id: 2,
                    status: 'in progress',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
                {
                    id: 3,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
            ];

            const expectResult = [
                {
                    id: 2,
                    status: 'in progress',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
            ];

            wrapper.setState({projects: projects});
            expect(wrapper.state()).toEqual({projects: projects});
            expect(instance._filterProjectsByStatus('in progress')).toEqual(expectResult);
        });

        it('input status => completed', () => {
            const projects = [
                {
                    id: 1,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
                {
                    id: 2,
                    status: 'completed',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
                {
                    id: 3,
                    status: 'new',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
            ];

            const expectResult = [
                {
                    id: 2,
                    status: 'completed',
                    supervisorID: 'supervisor 1 me',
                    coordinatorID: 'supervisor 1 me',
                },
            ];

            wrapper.setState({projects: projects});
            expect(wrapper.state()).toEqual({projects: projects});
            expect(instance._filterProjectsByStatus('completed')).toEqual(expectResult);
        });
    });
});
