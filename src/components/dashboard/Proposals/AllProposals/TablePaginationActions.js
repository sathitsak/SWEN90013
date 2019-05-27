import {makeStyles, useTheme} from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Table from "@material-ui/core/Table";

const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        color: "#232FFD",
        marginLeft: 100,
    },
}));


class TablePaginationActions extends React.Component {
    constructor(props) {
        super(props);
    }

    _handleFirstPageButtonClick(event) {
        onChangePage(event, 0);
    }

    _handleBackButtonClick(event) {
        onChangePage(event, page - 1);
    }

    _handleNextButtonClick(event) {
        onChangePage(event, page + 1);
    }

    _handleLastPageButtonClick(event) {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    }

    render() {
        const classes = useStyles1();
        const theme = useTheme();

        const {count, page, rowsPerPage, onChangePage} = this.props;

        return (
            <div className={classes.root}>
                <IconButton
                    onClick={this._handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="First Page"
                >
                    <FirstPageIcon/>
                </IconButton>
                <IconButton onClick={this._handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                    <KeyboardArrowLeft/>
                </IconButton>
                <IconButton
                    onClick={this._handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    <KeyboardArrowRight/>
                </IconButton>
                <IconButton
                    onClick={this._handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    <LastPageIcon/>
                </IconButton>
            </div>
        );
    }
}


export default withStyles(useStyles1)(TablePaginationActions);