import IconButton from "@material-ui/core/IconButton";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import PropTypes from "prop-types";
import React from "react";

class TablePaginationActions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {count, page, rowsPerPage, onChangePage, classes} = this.props;

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
                    <LastPageIcon/> : <FirstPageIcon/>
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="Previous Page">
                    <KeyboardArrowRight/> : <KeyboardArrowLeft/>
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Next Page"
                >
                    <KeyboardArrowLeft/> : <KeyboardArrowRight/>
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Last Page"
                >
                    <FirstPageIcon/> : <LastPageIcon/>
                </IconButton>
            </div>
        );
    }
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

export default TablePaginationActions;