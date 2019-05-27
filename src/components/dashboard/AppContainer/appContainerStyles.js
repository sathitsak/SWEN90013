const drawerWidth = 240;

export default theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        background: "#304E64"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
    avatar: {
        margin: 20,
        width: 60,
        height: 60
    },
    link: {
        float: "left",
        width: "100%",
        textDecoration: "none",
        "&:active": {
            backgroundColor: "#ADB8C1"
        }
    },
    userTitle: {
        marginTop: 40
    }
});
