const drawerWidth = 240;

export default theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        backgroundColor: "#004576",
        marginLeft: drawerWidth,
        [theme.breakpoints.up('md')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
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
