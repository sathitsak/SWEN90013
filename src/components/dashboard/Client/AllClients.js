/**
 * This component contains all clients. It is entered via the "View Clients" link on the app drawer.
 * Author: Reyna Tan
 * Date: 09/10/2019
 */

import React, { PureComponent } from 'react';
import store from "../../../store";
import {getAllClients} from "../../../api";
import {
    getAllClientsAction,
} from "../../../store/actionCreators";
import MaterialTable from 'material-table';
import ClientPageModal from "./ClientPageModal";
import {grey, red} from "@material-ui/core/colors";
import ErrorOutlinedIcon from '@material-ui/icons/ErrorOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';

// Options of dropdown filter for the technical ability column
const TECHNICAL_ABILITY_LOOKUP = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    10: "10"
}

class AllClients extends PureComponent {

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
        const clients = await getAllClients();
        const getAllClientsAct = getAllClientsAction(clients);
        store.dispatch(getAllClientsAct);
    }

    componentDidMount() {
        this._reqTodoList();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.currentPage);
    }

    _formatDataIntoTableList() {
        const {clients} = this.state;

        let clientList = [];

        clients.forEach(c => {
            let nextClient = {
                name: c.firstName + " " + c.lastName,
                email: c.email,
                contactNumber: c.contactNumber,
                organisation: c.organisation.name,
                technicalAbility: c.technicalAbility,
                flag: c.flag,
                client: this._getClientPageModal(c)
            }

            clientList.push(nextClient);
            
        })

        return clientList;
    }

    // Render clientPageModal
    _getClientPageModal(client) {
        return (
            <ClientPageModal 
                client={client}
                objType={"allClients"}
            />
        )
    }

    // Render clientPageModal
    _handleClick(client) {
       return (
            <ClientPageModal 
                client={client}
                objType={"allClients"}
                // objID={null}
            />
        )
    }

    // Render correct flagIcon
    _getClientFlagIcon(flag){
        if (flag) {
            return <ErrorOutlinedIcon style={{color: red[500]}}/>
        } else {
            return <ErrorOutlineOutlinedIcon style={{color: grey[500]}}/>
        }
    }

    // Return technicalAbility lookup options
    _getTechnicalAbilityLookup() {
        return TECHNICAL_ABILITY_LOOKUP;
    }

    render() {
        
        return (
            <MaterialTable
                title="All Clients"
                columns={[
                    { title: 'Flag', field: 'flag', 
                        filterCellStyle:{maxWidth:50}, 
                        lookup: {1: "Yes", 0: "No"}, 
                        filterCellStyle:{paddingTop:0},
                        cellStyle: {textAlign:"center"},
                        render: rowData => this._getClientFlagIcon(rowData.flag)
                    },
                    { title: 'Name', field: 'name' },
                    { title: 'Email', field: 'email' },
                    { title: 'Contact Number', field: 'contactNumber' },
                    { title: 'Organisation', field: 'organisation' },
                    { title: 'Technical Ability', 
                        field: 'technicalAbility',
                        cellStyle: {textAlign:"center"},
                        lookup: this._getTechnicalAbilityLookup()
                     },
                    { title: 'View', field: 'client', filtering: false }
                ]}
                data={this._formatDataIntoTableList()}
                options={{
                    filtering: true,
                    exportButton: true,
                }}
                // onRowClick={(event, rowData) => this._handleClick(rowData.client)}
            />
        );
    }
}

export default (AllClients);