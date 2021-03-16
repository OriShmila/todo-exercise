import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Link } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { usersService } from "../../services";
import { User } from "../../services/users-service";

export const SignIn = ({ signUpPath, login }: SignInProps) => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);
  const [userSelected, setUserSelected] = useState<User | null>(null);
  const [loader, setLoader] = useState(true);

  const handleChange = (_: ChangeEvent<{}>, value: User | null) => {
    setUserSelected(value);
  };

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (userSelected === null) {
      return;
    }

    event.preventDefault();
    login(userSelected);
  };

  const fetchUsers = async () => {
    try {
      setUsers(await usersService.fetchAllUsers());
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Typography component="h1" variant="h5">
        לכניסה
      </Typography>
      <form className={classes.form}>
        <Autocomplete
          id="combo-box"
          options={users}
          getOptionLabel={(user) => user?.name}
          onChange={handleChange}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              required
              label="בחר משתמש"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loader ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          לכניסה
        </Button>
        <Link to={signUpPath}>{"אין לך חשבון? להרשמה"}</Link>
      </form>
    </>
  );
};

interface SignInProps {
  signUpPath: string;
  login: (user: User) => void;
}

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
