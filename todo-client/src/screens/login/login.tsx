import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect, Route } from "react-router-dom";
import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";
import { User } from "../../services/users-service";

export enum Routs {
  SIGM_IN = "/sign-in",
  SIGM_UP = "/sign-up",
}

export const Login = ({ path, login }: LoginProps) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <>
        <Route path={path + Routs.SIGM_IN}>
          <SignIn signUpPath={path + Routs.SIGM_UP} login={login} />
        </Route>
        <Route path={path + Routs.SIGM_UP}>
          <SignUp login={login} />
        </Route>
        <Redirect from={path} to={path + Routs.SIGM_IN} />
      </>
    </div>
  );
};

interface LoginProps {
  path: string;
  login: (user: User) => void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));
