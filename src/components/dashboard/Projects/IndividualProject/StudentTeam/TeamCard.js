import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import TeamArtefacts from "./TeamArtefacts";
import Chip from '@material-ui/core/Chip';
import { green, white } from "@material-ui/core/colors";


const styles = theme => ({
    expansionPanel: {
        borderRadius: 5,
        marginBottom: 7,
        "&:before": {
            backgroundColor: "#FFFFFF"
        }
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
    },
    teamName: {
        fontSize: 16,
        fontWeight: "bold"
    },
    chip: {
        marginRight: 3, 
        backgroundColor: green[500],
        fontSize: 12,
        color: "#FFFFFF",
    }
});

class TeamCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }

    render() {
        const {product, classes} = this.props;

        return (
            <ExpansionPanel className={classes.expansionPanel}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className={classes.expansionPanelSummary}
                >
                    <Grid container spacing={24}>
                        <Grid item xs={5}>
                            <Typography className={classes.teamName}>
                                {product.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={7}>
                            <div style={{ textAlign: "right" }}>
                                {product.activelyUsed ? 
                                    <Chip size="small" label="Actively Used" className={classes.chip} />
                                 : <div/>}
                                {product.Deployed ? 
                                    <Chip size="small" label="Deployed" className={classes.chip} />
                                 : <div/>} 
                            </div>
                        </Grid>
                     </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                    <TeamArtefacts 
                        students={product.students} 
                        productLinks={product.productLinks}
                        technologies={product.technologies} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }

}

TeamCard.propTypes = {
    classes: PropTypes.object.isRequired,
    product: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeamCard);