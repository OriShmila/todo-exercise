import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export const TodoAppBar = ({ userLoginName = null }: TodoAppBarProps) => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Grid container>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Typography variant="h5" noWrap className={classes.centeredItem}>
              Todo
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {userLoginName !== null && (
              <Typography variant="h6" noWrap className={classes.leftItem}>
                שלום: {userLoginName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface TodoAppBarProps {
  userLoginName?: string | null;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  centeredItem: {
    textAlign: "center",
  },
  leftItem: {
    textAlign: "end",
  },
}));
