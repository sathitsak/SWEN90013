/**
 * This component contains all products. It is entered via a "View Student Teams" link on the app container drawer.
 * Author: Reyna Tan
 * Date: 09/10/2019
 */

import React, { PureComponent } from 'react';
import store from "../../../../../store";
import {getAllSubjects, getProjectList, getSupervisors, getAllProducts} from "../../../../../api";
import {
    getAllProjectAction,
    getSupervisorsAction,
    getAllSubjectsAction,
    updatePageTitleAction,
} from "../../../../../store/actionCreators";
import MaterialTable from 'material-table';

class AllStudentTeams extends PureComponent {

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

        const updatePageTitleAct = updatePageTitleAction("All Student Teams");
        store.dispatch(updatePageTitleAct);
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

        let productList = [];

        projects.forEach(p => {

            // First check if valid
            if ('proposal' in p) {
                if ('client' in p.proposal) {
                    if ('organisation' in p.proposal.client) {
                        if (p.products.length > 0) {
                            
                            p.products.forEach(team => {
                                let nextProduct = {
                                    year: this._extractYear(p.date),
                                    subjectId: p.subjectId,
                                    teamName: team.name,
                                    projectName: p.name,
                                    supervisor: this._showSupervisorName(p.supervisorId),
                                    client: p.proposal.client.firstName + " " + p.proposal.client.lastName,
                                    activelyUsed: (team.activelyUsed ? team.activelyUsed : "false"),
                                    deployed: (team.deployed ? team.deployed : "false"),
                                    technologies: team.technologies.join(", "),
                                    _id: p._id
                                }
                    
                                productList.push(nextProduct);
                            })
                        }
                    }
                }
            }
            
        })

        return productList;
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

    // Redirect to ProjectById page
    _handleClick(_id) {
        const { history } = this.props;
        history.push(`/dashboard/projects/${_id}`);
    }

    render() {
        
        return (
            <MaterialTable
                title="All Student Teams"
                columns={[
                    { title: 'Year', field: 'year', filterCellStyle:{maxWidth:50} },
                    { title: 'Subject', field: 'subjectId', filterCellStyle:{maxWidth:50}, lookup: this._getSubjectFilterLookup(), filterCellStyle:{paddingTop:0} },
                    { title: 'Team Name', field: 'teamName' },
                    { title: 'Project Name', field: 'projectName' },
                    { title: 'Supervisor', field: 'supervisor', lookup: this._getSupervisorFilterLookup(), filterCellStyle:{paddingTop:0} },
                    { title: 'Client', field: 'client' },
                    { title: 'Actively Used', field: 'activelyUsed', lookup: { true: "Yes", false: "No"}, filterCellStyle:{paddingTop:0, maxWidth:50} },
                    { title: 'Deployed', field: 'deployed', lookup: { true: "Yes", false: "No"}, filterCellStyle:{paddingTop:0, maxWidth:50} },                 
                    { title: 'Technologies', field: 'technologies' }
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

export default (AllStudentTeams);