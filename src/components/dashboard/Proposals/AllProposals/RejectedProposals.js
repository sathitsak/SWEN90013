/**
 * This component contains all proposals. It is entered via a "View All Proposals" button on the Proposals page.
 * Author: Reyna Tan
 * Date: 07/05/2019
 */

import React from 'react';
import store from "../../../../store";
import {getProposalList, getAllSubjects} from "../../../../api";
import {getAllProposalsAction, getAllSubjectsAction} from "../../../../store/actionCreators";
import MaterialTable from 'material-table';

class RejectedProposals extends React.Component {
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

    _capitalize(str) {
        if (str === "new") {
            return "New";
        } else if (str === "approved") {
            return "Approved";
        } else {
            return "Rejected";
        }
    };

    _extractYear(str) {
        // Format in which the date is stored in the DB: 2019-10-07T03:34:16.921Z
        // Slice the string using "-" and extract only the first element
        return str.split("-")[0];
    }

    _formatDataIntoTableList() {
        const {proposals} = this.state;

        let proposalList = [];

        proposals.forEach(p => {
            let nextProposal = {
                year: this._extractYear(p.date),
                name: p.name,
                client: p.client.firstName + " " + p.client.lastName,
                outlineOfProject: p.outlineOfProject,
                status: this._capitalize(p.status),
                subjectId: p.subjectId
            }

            proposalList.push(nextProposal);
        })

        return proposalList;
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
                    { title: 'Status', field: 'status', lookup: { New: 'New', Approved: 'Approved', Rejected: 'Rejected'}, filterCellStyle:{marginTop:0} },
                    { title: 'Subject', field: 'subjectId', filterCellStyle:{maxWidth:50} },
                ]}
                data={this._formatDataIntoTableList()}
                options={{
                    filtering: true,
                }}
            />
        );
    }
}

export default (RejectedProposals);