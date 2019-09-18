/**
 * This component contains the pop-up for updating a student team.
 * It sits within an individual team card under the TeamPage within a ProjectById component.
 * Author: Reyna Tan
 * Date: 18/09/2019
 */

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import {Divider} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from "@material-ui/core/TableHead/TableHead";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import store from "../../../../../store";
import {grey} from "@material-ui/core/colors";
import TabContainer from "react-bootstrap/TabContainer";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from "prop-types";
import {
    getGetProjectByIdAction,
    updateProductAction
} from "../../../../../store/actionCreators";
import {getProjectById} from "../../../../../api";

const styles = theme => ({
        root: {
            flexGrow: 1,
            display: "flex",
            flexWrap: "wrap"
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing.unit * 4,
            paddingLeft: theme.spacing.unit * 4,
            outline: "none"
        },
        formControl: {
            margin: 2,
            minWidth: 120,
            maxWidth: 300
        },
        fab: {
            backgroundColor: "#094183",
            '&:hover': {
                backgroundColor: "#4074B2"
            },
            boxShadow: "none",
        },
        studentTeamHeader: {
            fontWeight: "bold",
            [theme.breakpoints.up('sm')]: {
                paddingTop: 20,
            },
            [theme.breakpoints.down('sm')]: {
                paddingTop: 5,
            },
            marginLeft: 23,
        },
        selectField: {
            marginTop: 15,
        },
        resize: {
            fontSize: 15,
            padding: 10
        },
        saveButton: {
            backgroundColor: "#094183",
            '&:hover': {
                backgroundColor: "#4074B2",
            }
        },
        discardButton: {
            color: "#094183",
        },
        editTeamButton: {
            color: "#094183",
            backgroundColor: grey[100]
        },
    }
);

const NUM_ITEMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        }
    },
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "left"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "left"
    },
    getContentAnchorEl: null,
    dense: "true"
};

class EditStudentTeam extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            fullWidth: true,
            maxWidth: "lg",
            numStudents: props.product.students.length,
            numProductLinks: (props.product.productLinks ? props.product.productLinks.length : 0),
            numTechnologies: props.product.technologies ? props.product.technologies.length : 0,
            activelyUsed: props.product.activelyUsed ? props.product.activelyUsed : false,
            deployed: props.product.deployed ? props.product.deployed : false,
        };

        this._handleStoreChange = this._handleStoreChange.bind(this);
        store.subscribe(this._handleStoreChange);
    }

    _handleStoreChange() {
        this.setState(store.getState());
    }

    _handleClickOpen = () => {
        this.setState({open: true});
    };

    _handleClose = () => {
        this.setState({open: false});
    };

    _handleNumStudentsChange = (event) => {
        this.setState({numStudents: event.target.value})
    };

    _handleNumProductLinksChange = (event) => {
        this.setState({numProductLinks: event.target.value})
    };

    _handleNumTechnologiesChange = (event) => {
        this.setState({numTechnologies: event.target.value})
    };

    _handleMetricChange = (metricName) => event => {
        this.setState({[metricName]: event.target.checked});
    };
    _createRows = (tableName) => {
        var number;
        if (tableName === "numStudents") {
            number = this.state.numStudents;
        } else if (tableName === "numProductLinks") {
            number = this.state.numProductLinks;
        } else {
            number = this.state.numTechnologies;
        }

        let rows = [];

        for (var i = 0; i < number; i++) {
            let newObject = {index: i};
            rows.push(newObject);
        }
        return rows;
    };

    _handleUpdateStudentTeam = () => {
        const {
            numStudents,
            numProductLinks,
            numTechnologies,
            deployed,
            activelyUsed
        } = this.state;
        const {product} = this.props;

        // Compile student list
        const studentList = [];
        for (var i = 0; i < numStudents; i++) {
            let name = document.getElementById("name" + i).value;
            let email = document.getElementById("email" + i).value;
            var nextStudent = {
                name: name,
                email: email,
            };
            studentList.push(nextStudent);
        }

        // Compile artefacts
        const productLinksList = [];
        for (var j = 0; j < numProductLinks; j++) {
            let productLink = document.getElementById("productLinks" + j).value;
            productLinksList.push(productLink);
        }

        // Compile technologies
        const technologiesList = [];
        for (var k = 0; k < numTechnologies; k++) {
            let technology = document.getElementById("technologies" + k).value;
            technologiesList.push(technology);
        }

        product.name = document.getElementById("teamName").value;
        product.deployed = deployed;
        product.activelyUsed = activelyUsed;
        product.productLinks = productLinksList;
        product.technologies = technologiesList;
        product.students = studentList;

        const updateProdAction = updateProductAction(product._id, product);
        store.dispatch(updateProdAction);

        this._updateProjectState();

        // Close window
        this._handleClose();
    };

    async _updateProjectState() {
        const {projectId} = this.props;
        const project = await getProjectById(projectId);
        const getProAction = getGetProjectByIdAction(project);
        store.dispatch(getProAction);
    }


    render() {
        const {classes, product} = this.props;

        return (
            <div>
                <Typography gutterBottom/>

                <Grid align="right">
                    <Button
                        className={classes.editTeamButton}
                        onClick={this._handleClickOpen}
                        color="primary"
                        style={{marginRight: 12}}>
                        Edit Team
                    </Button>
                </Grid>

                <Dialog
                    fullWidth={this.state.fullWidth}
                    maxWidth={this.state.maxWidth}
                    open={this.state.open}
                    onClose={this._handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle onClose={this._handleClose}>
                        Edit {product.name}
                    </DialogTitle>

                    <Divider/>

                    <DialogContent>
                        <Grid container spacing={8}>
                            <Grid item xs={2}>
                                <div className={classes.studentTeamHeader}>
                                    Team Name
                                </div>
                            </Grid>
                            <Grid item xs={10}>
                                <form
                                    className={classes.container}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField
                                        id="teamName"
                                        className={classes.textField}
                                        margin="normal"
                                        inputProps={{'aria-label': 'Team Name'}}
                                        fullWidth
                                        defaultValue={product.name}
                                    />
                                </form>
                            </Grid>
                        </Grid>

                        <br/>

                        {/* Tabs student, artefacts and technologies. Pre-load current information */}
                        <TabContainer id="right-tabs-example"
                                        defaultActiveKey="first">
                            <Row>
                                <Col xs>
                                    <Nav variant="pills"
                                            className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="first">Students</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col xs>
                                    <Nav variant="pills"
                                            className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="second">Artefacts</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col xs>
                                    <Nav variant="pills"
                                            className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="third">Technologies</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col xs>
                                    <Nav variant="pills"
                                            className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link
                                                eventKey="fourth">Metrics</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                            </Row>
                            <Row>
                                {/* Table to display students */}
                                <Col sm={12}>
                                    <TabContent>
                                        <TabPane
                                            eventKey="first">
                                            <Grid container
                                                    spacing={8}
                                                    alignItems="center">
                                                <Grid item
                                                        xs={3}>
                                                    <div
                                                        className={classes.studentTeamHeader}>
                                                        Number
                                                        of
                                                        students
                                                    </div>
                                                </Grid>
                                                <Grid item
                                                        xs={9}>
                                                    <form
                                                        className={classes.container}
                                                        noValidate
                                                        autoComplete="off">
                                                        <Select
                                                            className={classes.selectField}
                                                            autoWidth={true}
                                                            value={this.state.numStudents}
                                                            onChange={e => this._handleNumStudentsChange(e)}
                                                            MenuProps={MenuProps}
                                                        >
                                                            {NUM_ITEMS.map(number => (
                                                                <MenuItem
                                                                    value={number}
                                                                    key={number}>
                                                                    {number}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </form>
                                                </Grid>
                                            </Grid>

                                            <Table
                                                className={classes.table}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            align="left">Name</TableCell>
                                                        <TableCell
                                                            align="left">Email
                                                            Address</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {this._createRows("numStudents").map(
                                                        (index) => (
                                                            <TableRow
                                                                key={index.index}>
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row">
                                                                    <form
                                                                        className={classes.container}
                                                                        noValidate
                                                                        autoComplete="off"
                                                                    >
                                                                        <TextField
                                                                            id={"name" + index.index}
                                                                            className={classes.textField}
                                                                            margin="dense"
                                                                            inputProps={{'aria-label': 'Name'}}
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            defaultValue={product.students[index.index] ? product.students[index.index].name : ""}
                                                                            InputProps={{
                                                                                classes: {
                                                                                    input: classes.resize,
                                                                                },
                                                                            }}
                                                                        />
                                                                    </form>
                                                                </TableCell>
                                                                <TableCell
                                                                    align="left">
                                                                    <form
                                                                        className={classes.container}
                                                                        noValidate
                                                                        autoComplete="off"
                                                                    >
                                                                        <TextField
                                                                            id={"email" + index.index}
                                                                            className={classes.textField}
                                                                            margin="dense"
                                                                            inputProps={{'aria-label': 'Email Address'}}
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            defaultValue={product.students[index.index] ? product.students[index.index].email : ""}
                                                                            InputProps={{
                                                                                classes: {
                                                                                    input: classes.resize,
                                                                                },
                                                                            }}
                                                                        />
                                                                    </form>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TabPane>
                                    </TabContent>

                                    {/* Table to display artefacts */}
                                    <TabContent>
                                        <TabPane
                                            eventKey="second">
                                            <Grid container
                                                    spacing={8}
                                                    alignItems="center">
                                                <Grid item
                                                        xs={3}>
                                                    <div
                                                        className={classes.studentTeamHeader}>
                                                        Number
                                                        of
                                                        artefacts
                                                    </div>
                                                </Grid>
                                                <Grid item
                                                        xs={9}>
                                                    <form
                                                        className={classes.container}
                                                        noValidate
                                                        autoComplete="off">
                                                        <Select
                                                            className={classes.selectField}
                                                            autoWidth={true}
                                                            value={this.state.numProductLinks}
                                                            onChange={e => this._handleNumProductLinksChange(e)}
                                                            MenuProps={MenuProps}
                                                        >
                                                            {NUM_ITEMS.map(number => (
                                                                <MenuItem
                                                                    value={number}
                                                                    key={number}>
                                                                    {number}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </form>
                                                </Grid>
                                            </Grid>

                                            <Table
                                                className={classes.table}>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            align="left">Artefact
                                                            Link</TableCell>
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                    {this._createRows("numProductLinks").map(
                                                        (index) => (
                                                            <TableRow
                                                                key={index.index}>
                                                                <TableCell
                                                                    component="th"
                                                                    scope="row">
                                                                    <form
                                                                        className={classes.container}
                                                                        noValidate
                                                                        autoComplete="off"
                                                                    >
                                                                        <TextField
                                                                            id={"productLinks" + index.index}
                                                                            className={classes.textField}
                                                                            margin="dense"
                                                                            inputProps={{'aria-label': 'Artefact'}}
                                                                            fullWidth
                                                                            variant="outlined"
                                                                            defaultValue={product.productLinks[index.index] ? product.productLinks[index.index] : ""}
                                                                            InputProps={{
                                                                                classes: {
                                                                                    input: classes.resize,
                                                                                },
                                                                            }}
                                                                        />
                                                                    </form>
                                                                </TableCell>
                                                            </TableRow>
                                                        )
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </TabPane>
                                    </TabContent>

                                    {/* Table to display technologies */}
                                    <TabContent>
                                        <TabPane
                                            eventKey="third">
                                            <Grid container
                                                    spacing={8}
                                                    alignItems="center">
                                                <Grid item
                                                        xs={3}>
                                                    <div
                                                        className={classes.studentTeamHeader}>
                                                        Number
                                                        of
                                                        technologies
                                                        utilised
                                                    </div>
                                                </Grid>
                                                <Grid item
                                                        xs={9}>
                                                    <form
                                                        className={classes.container}
                                                        noValidate
                                                        autoComplete="off">
                                                        <Select
                                                            className={classes.selectField}
                                                            autoWidth={true}
                                                            value={this.state.numTechnologies}
                                                            onChange={e => this._handleNumTechnologiesChange(e)}
                                                            MenuProps={MenuProps}
                                                        >
                                                            {NUM_ITEMS.map(number => (
                                                                <MenuItem
                                                                    value={number}
                                                                    key={number}>
                                                                    {number}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </form>
                                                </Grid>
                                            </Grid>

                                            <Grid container
                                                    spacing={8}
                                                    style={{
                                                        marginLeft: 20,
                                                        width: "98%"
                                                    }}>
                                                {this._createRows("numTechnologies").map(
                                                    (index) => (
                                                        <Grid
                                                            item
                                                            xs={3}
                                                            key={index.index}>
                                                            <form
                                                                className={classes.container}
                                                                noValidate
                                                                autoComplete="off"
                                                            >
                                                                <TextField
                                                                    id={"technologies" + index.index}
                                                                    className={classes.textField}
                                                                    margin="dense"
                                                                    inputProps={{'aria-label': 'Technology'}}
                                                                    fullWidth
                                                                    variant="outlined"
                                                                    defaultValue={product.technologies[index.index] ? product.technologies[index.index] : ""}
                                                                    InputProps={{
                                                                        classes: {
                                                                            input: classes.resize,
                                                                        },
                                                                    }}
                                                                />
                                                            </form>
                                                        </Grid>
                                                    )
                                                )}
                                            </Grid>
                                        </TabPane>
                                    </TabContent>

                                    {/* Table to display metrics */}
                                    <TabContent>
                                        <TabPane
                                            eventKey="fourth">
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.activelyUsed}
                                                        onChange={this._handleMetricChange("activelyUsed")}
                                                        value="activelyUsed"
                                                    />
                                                }
                                                label="Actively Used"
                                                labelPlacement="start"
                                            />
                                            <br/>
                                            <FormControlLabel
                                                control={
                                                    <Switch
                                                        checked={this.state.deployed}
                                                        onChange={this._handleMetricChange("deployed")}
                                                        value="deployed"
                                                    />
                                                }
                                                label="Deployed"
                                                labelPlacement="start"
                                            />
                                        </TabPane>
                                    </TabContent>
                                </Col>
                            </Row>
                        </TabContainer>

                    </DialogContent>

                    <Divider/>

                    <DialogActions>
                        <Button
                            className={classes.saveButton}
                            variant="contained"
                            color="primary"
                            onClick={this._handleUpdateStudentTeam}
                        >
                            Save
                        </Button>
                        <Button
                            className={classes.discardButton}
                            onClick={this._handleClose}
                            color="primary">
                            Discard
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

EditStudentTeam.propTypes = {
    classes: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
    projectId: PropTypes.string.isRequired,
};

export default withStyles(styles)(EditStudentTeam);
