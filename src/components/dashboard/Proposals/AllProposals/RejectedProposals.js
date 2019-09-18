/**
 * This component contains all reject proposals. It is entered via a "View Rejected Proposals" button on the Proposals page.
 * Author: Reyna Tan
 * Date: 07/05/2019
 */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import {withStyles} from "@material-ui/core/styles";
import axios from "axios";
import TableHead from "@material-ui/core/TableHead/TableHead";
import store from "../../../../store";
import { getProposalList } from "../../../../api";
import { getGetAllProposalsAction } from "../../../../store/actionCreators";

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: "#232FFD",
        marginLeft: 100,
    },
    link: {
        textDecoration: "none"
    }
}));


function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();

    const { count, page, rowsPerPage, onChangePage } = props;

    function handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    function handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    function handleNextButtonClick(event) {
        onChangePage(event, page + 1);
    }

    function handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="First Page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                <KeyboardArrowLeft />
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Next Page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="Last Page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = theme => ({
    root: {
        width: '100%',
        marginTop: 100,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

const status = {
    new: "new",
    approved: "approved",
    reject: "reject"
};

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
        const result = await getProposalList();
        const action = getGetAllProposalsAction(result);
        store.dispatch(action);
    }

    componentDidMount() {
        this._reqTodoList();
    }

    _filterProposalsByStatus = status => {
        //TODO: filter by user
        const { proposals } = this.state;
        let targetProposals = [];

        proposals.forEach(p => {
            // First check if valid before sending through
            if ('client' in p ) {
            if ('organisation' in p.client) {
                if (p.status === status) {
                targetProposals.push(p);
                }
            }
            }
            
        });

        return targetProposals;
    };
    

    render() {
        const classes = useStyles2();

        const rejected = this._filterProposalsByStatus(status.reject);

        const emptyRows = this.rowsPerPage - Math.min(this.rowsPerPage, rejected.length - this.page * this.rowsPerPage);

        function handleChangePage(event, newPage) {
            this.setPage(newPage);
        }

        function handleChangeRowsPerPage(event) {
            this.setRowsPerPage(parseInt(event.target.value, 10));
        }

        function handleClick(event, id) {
            window.location.href=`/dashboard/proposals/${id}`;
        }

        return (
            <Paper className={useStyles2.root}>
                <div className={classes.tableWrapper}>
                    <Table className={useStyles2.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: "20%"}}>Project Name</TableCell>
                                <TableCell align="left" style={{ width: "15%"}}>Client</TableCell>
                                <TableCell align="left" style={{ width: "15%"}}>Organisation</TableCell>
                                <TableCell align="left" style={{ width: "50%"}}>Project Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this._filterProposalsByStatus(status.reject).map(p => (
                                <TableRow
                                    hover
                                    onClick={event => handleClick(event, p._id)}
                                    key={p._id}>
                                    <TableCell component="th" scope="row">
                                        {p.name}
                                    </TableCell>
                                    <TableCell align="left">{p.client.firstName + " " + p.client.lastName}</TableCell>
                                    <TableCell align="left">{p.client.organisation.name}</TableCell>
                                    <TableCell align="left">{p.outlineOfProject}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </div>
            </Paper>
        );
    }
}

export default withStyles(useStyles2)(RejectedProposals);