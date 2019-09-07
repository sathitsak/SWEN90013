/**
 * This component contains all reject proposals. It is entered via a "View Rejected Proposals" button on the Proposals page.
 * Author: Reyna Tan
 * Date: 07/05/2019
 */

import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import TableHead from "@material-ui/core/TableHead/TableHead";

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: "#232FFD",
    marginLeft: 100
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
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
      >
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
  rowsPerPage: PropTypes.number.isRequired
};

const useStyles2 = theme => ({
  root: {
    width: "100%",
    marginTop: 100
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const status = {
  new: "new",
  approved: "approved",
  rejected: "rejected"
};

class RejectedProposals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proposals: [],
      page: 0,
      setPage: 0,
      rowsPerPage: 5,
      setRowsPerPage: 5
    };
  }

  componentDidMount() {
    axios
      .get(`https://5ce79b719f2c390014dba00f.mockapi.io/proposal/`)
      .then(results => {
        this.setState({ proposals: results.data });
      });
  }

  _filterProposalsByStatus = status => {
    const { proposals } = this.state;
    let targetProposals = [];

    proposals.forEach(p => {
      if (p.status === status) {
        targetProposals.push(p);
      }
    });
    console.log(proposals);
    return targetProposals;
  };

  render() {
    const classes = useStyles2();

    const rejected = this._filterProposalsByStatus(status.rejected);

    const emptyRows =
      this.rowsPerPage -
      Math.min(
        this.rowsPerPage,
        rejected.length - this.page * this.rowsPerPage
      );

    function handleChangePage(event, newPage) {
      this.setPage(newPage);
    }

    function handleChangeRowsPerPage(event) {
      this.setRowsPerPage(parseInt(event.target.value, 10));
    }

    function handleClick(event, id) {
      window.location.href = `/dashboard/proposals/${id}`;
    }

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Project Name</TableCell>
                <TableCell align="left">Client</TableCell>
                <TableCell align="left">Organisation</TableCell>
                <TableCell align="left">Project Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rejected.map(p => (
                <TableRow
                  hover
                  onClick={event => handleClick(event, p.id)}
                  key={p.id}
                >
                  <TableCell component="th" scope="row">
                    {p.name}
                  </TableCell>
                  <TableCell align="left">{p.client}</TableCell>
                  <TableCell align="left">{p.organisation}</TableCell>
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
