import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import ViewProposal from "../ViewProposal";

describe('<ViewProposal />', () => {
    let shallow;
    let wrapper;
    let instance;

    let proposalID = "1";

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <ViewProposal
                proposalID={proposalID}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('proposalID: "1"', () => {
            expect(instance.props.proposalID).toEqual("1");
        });
    });

});