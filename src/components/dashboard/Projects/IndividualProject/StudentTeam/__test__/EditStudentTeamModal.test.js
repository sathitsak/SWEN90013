import React from 'react';
import {createShallow} from "@material-ui/core/test-utils";
import EditStudentTeam from "../EditStudentTeam";

describe('<EditStudentTeam />', () => {
    let shallow;
    let wrapper;
    let instance;

    let product = {
        _id: "1",
        name: "name",
        deployed: true,
        activelyUsed: false,
        projectId: "1",
        productLinks: "www.youtube.com",
        document: "document",
        media: "media",
        technologies: [],
        students: [],
        notes: [],
    };

    beforeEach(() => {
        shallow = createShallow();
        wrapper = shallow(
            <EditStudentTeam
                product={product}
            />
        );
        instance = wrapper.instance();
    });

    describe('Render component, passing props', () => {
        it('product: _id => "1"', () => {
            expect(instance.props.product._id).toEqual("1");
        });

        it('product: name => "name"', () => {
            expect(instance.props.product.name).toEqual("name");
        });

        it('product: deployed => true', () => {
            expect(instance.props.product.deployed).toBeTruthy();
        });

        it('product: activelyUsed => false', () => {
            expect(instance.props.product.activelyUsed).toBeFalsy();
        });

        it('product: projectId => "1"', () => {
            expect(instance.props.product.projectId).toEqual("1");
        });

        it('product: productLinks => "www.youtube.com"', () => {
            expect(instance.props.product.productLinks).toEqual("www.youtube.com");
        });

        it('product: document => "document"', () => {
            expect(instance.props.product.document).toEqual("document");
        });

        it('product: media => "media"', () => {
            expect(instance.props.product.media).toEqual("media");
        });

        it('product: technologies => empty', () => {
            expect(instance.props.product.technologies.length).toEqual(0);
        });

        it('product: students => empty', () => {
            expect(instance.props.product.students.length).toEqual(0);
        });

        it('product: notes => empty', () => {
            expect(instance.props.product.notes.length).toEqual(0);
        });
    });

});