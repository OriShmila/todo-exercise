import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { usersService } from "../../services";
import { User } from "../../services/users-service";

export const SignUp = ({ login }: SignUpProps) => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const saveUser = async () => {
    try {
      return usersService.createUser(name);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (name === "") {
      return;
    }

    event.preventDefault();

    const result = await saveUser();

    if (result === undefined) {
      return;
    }

    login(result);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        להרשמה
      </Typography>
      <form className={classes.form}>
        <TextField
          label="הכנס שם"
          onChange={handleChange}
          required
          variant="outlined"
          fullWidth
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          לשמירה והתחברות
        </Button>
      </form>
    </>
  );
};

interface SignUpProps {
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
