const drawerWidth = 240;

export default theme => ({
    root: {
        display: "flex"
    },
    appBar: {
        backgroundColor: "#094183",
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
    },
    container: {
        display: "flex",
        flexWrap: "wrap"
      },
      formControl: {
        minWidth: 120
      },
    //   showSup: {
    //     textAlign: "left",
    //     paddingLeft: 10,
    //     marginLeft: 20,
    //     marginTop: 10,
    //     height: 30,
    //     width: 570,
    //     fontSize: 17
    //   },
      primaryButton: {
        backgroundColor: "#094183",
        color: "#ffffff",
        "&:hover": {
          backgroundColor: "#062d5c",
          color: "#ffffff",
        },
      },
      showSup: {
        overflow: "auto",
        textAlign: "justify",
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        height: 35,
        marginRight: 10,
        marginBottom: 5,
        color: "#000000",
        // [theme.breakpoints.down("sm")]: {
        //     marginRight: 30
        // },
      }
});
