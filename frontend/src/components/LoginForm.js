import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
      display: "block"
    }
  },
  formStyle: {
    backgroundColor: "white",
    padding: '2em'
  },
  buttonClass: {
    margin: "auto",
    width: "50%",
  }
}));

export default function LoginForm(props) {
  const classes = useStyles();
  return (
    <div className={classes.formStyle}>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={props.handelLogin}>
        <TextField id="filled-basic" label="email or username" variant="filled" onChange={props.handleUserNameChange} />
        <TextField id="filled-basic" label="passowrd" variant="filled" type="password" onChange={props.handlePasswordChange} />
        <Button type="submit" className={classes.buttonClass} variant="contained" color="primary">
          login
        </Button>
      </form>
    </div>
  );
}

