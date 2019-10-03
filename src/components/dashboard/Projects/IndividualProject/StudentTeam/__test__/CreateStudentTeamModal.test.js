import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import CreateStudentTeamModal from "../CreateStudentTeamModal";

describe('<CreateStudentTeamModal />', () => {
    let shallow;
    let wrapper;
    let instance;

    let projectId = "1";

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <CreateStudentTeamModal
                projectId={projectId}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('projectId: "1"', () => {
            expect(instance.props.projectId).toEqual("1");
        });
    });

});