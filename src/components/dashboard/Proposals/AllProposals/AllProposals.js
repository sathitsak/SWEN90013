/**
 * This component contains all proposals. It is entered via a "View All Proposals" button on the Proposals page.
 * Author: Reyna Tan
 * Date: 07/05/2019
 */

import React, { PureComponent } from 'react';
import store from "../../../../store";
import {getProposalList, getAllSubjects} from "../../../../api";
import {getAllProposalsAction, getAllSubjectsAction} from "../../../../store/actionCreators";
import MaterialTable from 'material-table';

class AllProposals extends PureComponent {
    constructor(props) {
        super(props);
        this.state = store.getState();

        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(store.getState());
    }

    async _reqTodoList() {
        const proposals = await getProposalList();
        const getAllProposalsAct = getAllProposalsAction(proposals);
        store.dispatch(getAllProposalsAct);

        const subjects = await getAllSubjects();
        const getAllSubjectsAct = getAllSubjectsAction(subjects);
        store.dispatch(getAllSubjectsAct);
    }

    componentDidMount() {
        this._reqTodoList();
    }

    _extractYear(str) {
        // Format in which the date is stored in the DB: 2019-10-07T03:34:16.921Z
        // Slice the string using "-" and extract only the first element
        return str.split("-")[0];
    }

    _formatDataIntoTableList() {
        const {proposals} = this.state;

        let proposalList = [];

        proposals.forEach(p => {
            if ('client' in p) {
                if ('organisation' in p.client) {
                    let nextProposal = {
                        year: this._extractYear(p.date),
                        name: p.name,
                        client: p.client.firstName + " " + p.client.lastName,
                        outlineOfProject: p.outlineOfProject,
                        status: p.status,
                        subjectId: p.subjectId,
                        _id: p._id
                    }

                    proposalList.push(nextProposal);
                }
            }
        })

        return proposalList;
    }

    _showSubjectCode = (subjectId) => {
        const {subjects} = this.state;
        let subjectCode = " ";
        subjects.forEach(s => {
            if (s._id === subjectId) {
                subjectCode = s.code;
            }
        });
        return subjectCode;
    };

    _getSubjectFilterLookup() {
        const {subjects} = this.state;

        let subjectList = {};

        subjects.forEach(s => {
            subjectList[s._id] = this._showSubjectCode(s._id);
        })

        return subjectList;
    }

    // Rediret to ProposalById page
    _handleClick(_id) {
        const { history } = this.props;
        history.push(`/dashboard/proposals/${_id}`);
    }

    render() {
        
        return (
            <MaterialTable
                title="All Proposals"
                columns={[
                    { title: 'Year', field: 'year', filterCellStyle:{maxWidth:50} },
                    { title: 'Proposal Name', field: 'name' },
                    { title: 'Client', field: 'client' },
                    { title: 'Description', field: 'outlineOfProject', filtering: false },
                    { title: 'Status', field: 'status', lookup: { new: 'New', approved: 'Approved', reject: 'Rejected'}, filterCellStyle:{paddingTop:0} },
                    { title: 'Subject', field: 'subjectId', filterCellStyle:{maxWidth:50, paddingTop:0}, lookup: this._getSubjectFilterLookup() },
                ]}
                data={this._formatDataIntoTableList()}
                options={{
                    filtering: true,
                    exportButton: true,
                }}
                onRowClick={(event, rowData) => this._handleClick(rowData._id)}
            />
        );
    }
}

export default (AllProposals);