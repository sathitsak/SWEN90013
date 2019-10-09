/**
 * This component contains all proposals. It is entered via a "View All Proposals" button on the Proposals page.
 * Author: Reyna Tan
 * Date: 07/05/2019
 */

import React, { PureComponent } from 'react';
import store from "../../../../store";
import {getAllSubjects, getProjectList, getSupervisors} from "../../../../api";
import {
    getAllProjectAction,
    getSupervisorsAction,
    getAllSubjectsAction
} from "../../../../store/actionCreators";
import MaterialTable from 'material-table';

class AllProjects extends PureComponent {

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
        const projects = await getProjectList();
        const getAllProjectAct = getAllProjectAction(projects);
        store.dispatch(getAllProjectAct);

        const supervisors = await getSupervisors();
        const getSupervisorsAct = getSupervisorsAction(supervisors);
        store.dispatch(getSupervisorsAct);

        const subjects = await getAllSubjects();
        const getAllSubjectsAct = getAllSubjectsAction(subjects);
        store.dispatch(getAllSubjectsAct);
    }

    componentDidMount() {
        this._reqTodoList();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.currentPage);
    }

    _extractYear(str) {
        // Format in which the date is stored in the DB: 2019-10-07T03:34:16.921Z
        // Slice the string using "-" and extract only the first element
        return str.split("-")[0];
    }

    _formatDataIntoTableList() {
        const {projects} = this.state;

        let projectList = [];

        projects.forEach(p => {

            // First check if valid
            if ('proposal' in p) {
                if ('client' in p.proposal) {
                    if ('organisation' in p.proposal.client) {
                        let nextProject = {
                            year: this._extractYear(p.date),
                            name: p.name,
                            client: p.proposal.client.firstName + " " + p.proposal.client.lastName,
                            outlineOfProject: p.proposal.outlineOfProject,
                            status: p.status,
                            subjectId: p.subjectId,
                            supervisor: this._showSupervisorName(p.supervisorId),
                            _id: p._id
                        }
            
                        projectList.push(nextProject);
                    }
                }
            }
            
        })

        return projectList;
    }

    _showSupervisorName = (supervisorId) => {
        const {supervisors} = this.state;
        let supervisorName = " ";
        supervisors.forEach(sp => {
            if (sp._id === supervisorId) {
                supervisorName = sp.firstName + " " + sp.lastName;
            }
        });
        return supervisorName;
    };

    _getSupervisorFilterLookup() {
        const {supervisors} = this.state;

        let supervisorList = {};

        supervisors.forEach(sp => {
            let name = sp.firstName + " " + sp.lastName;

            if (! (name in supervisorList)) {
                supervisorList[name] = name;
            }
        })

        return supervisorList;
    }

    _getSubjectFilterLookup() {
        const {projects} = this.state;

        let subjectList = {};

        projects.forEach(p => {

            // First check if valid
            if ('proposal' in p) {
                if ('client' in p.proposal) {
                    if ('organisation' in p.proposal.client) {
                        if (! (p.subjectId in subjectList)) {
                            subjectList[p.subjectId] = p.subjectId;
                        }
                    }
                }
            }
            
        })

        return subjectList;
    }

    // Rediret to ProjectById page
    _handleClick(_id) {
        const { history } = this.props;
        history.push(`/dashboard/projects/${_id}`);
    }

    render() {
        
        return (
            <MaterialTable
                title="All Projects"
                columns={[
                    { title: 'Year', field: 'year', filterCellStyle:{maxWidth:50} },
                    { title: 'Project Name', field: 'name' },
                    { title: 'Client', field: 'client' },
                    { title: 'Description', field: 'outlineOfProject', filtering: false },
                    { title: 'Status', field: 'status', lookup: { new: 'New', inProgress: 'In Progress', completed: 'Completed'}, filterCellStyle:{paddingTop:0} },
                    { title: 'Subject', field: 'subjectId', filterCellStyle:{maxWidth:50}, lookup: this._getSubjectFilterLookup(), filterCellStyle:{paddingTop:0} },
                    { title: 'Supervisor', field: 'supervisor', lookup: this._getSupervisorFilterLookup(), filterCellStyle:{paddingTop:0} },
                ]}
                data={this._formatDataIntoTableList()}
                options={{
                    filtering: true,
                }}
                onRowClick={(event, rowData) => this._handleClick(rowData._id)}
            />
        );
    }
}

export default (AllProjects);